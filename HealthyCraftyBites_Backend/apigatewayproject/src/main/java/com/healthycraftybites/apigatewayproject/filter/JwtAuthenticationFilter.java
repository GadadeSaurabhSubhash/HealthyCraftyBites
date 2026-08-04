package com.healthycraftybites.apigatewayproject.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.healthycraftybites.apigatewayproject.util.KeyLoader;

import reactor.core.publisher.Mono;

import java.security.PublicKey;
import java.util.List;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final PublicKey publicKey;
    
    private static final String MENU_SERVICE_PREFIX = "/menumanagementservice/";

    private static final List<String> PUBLIC_ENDPOINTS = List.of(
        "/authenticationservice/adminauthentication/authenticateadmincredentials",
        "/authenticationservice/adminauthentication/refreshtoken",
        "/authenticationservice/adminauthentication/logout"
    );

    public JwtAuthenticationFilter() throws Exception {
        this.publicKey = KeyLoader.loadPublicKey("keys/public_key.pem");
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        if (PUBLIC_ENDPOINTS.contains(path)) {
            return chain.filter(exchange);
        }

        ServerHttpRequest request = exchange.getRequest();
        String authHeader = request.getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange);
        }

        String token = authHeader.substring(7);

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(publicKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String username = claims.getSubject();
            String role = claims.get("role", String.class);
            
            
            if (path.startsWith(MENU_SERVICE_PREFIX) && !"MANAGER".equals(role)) {
                return forbidden(exchange);
            }
            

            ServerHttpRequest mutatedRequest = request.mutate()
                    .header("X-Username", username)
                    .header("X-User-Role", role)
                    .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());

        } catch (JwtException | IllegalArgumentException e) {
            return unauthorized(exchange);
        }
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }
    
    private Mono<Void> forbidden(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN);
        return response.setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}