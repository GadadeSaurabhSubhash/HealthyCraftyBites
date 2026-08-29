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
        "/authenticationservice/adminauthentication/logout",
        "/authenticationservice/userauthentication/authenticateusercredentials",
        "/authenticationservice/userauthentication/refreshtoken",
        "/authenticationservice/userauthentication/logout",
        "/authenticationservice/userauthentication/checkifemailexists",
        "/authenticationservice/userauthentication/verifyotp",
        "/authenticationservice/userauthentication/userregistration",
        "/menumanagementservice/menuservice/viewallproducts",
        "/menumanagementservice/menuservice/viewallingredients",
        "/analyticsservice/insights"
    );

    public JwtAuthenticationFilter() throws Exception {
        PublicKey loadedKey;
        try {
            loadedKey = KeyLoader.loadPublicKey("keys/public_key.pem");
        } catch (Exception e) {
            loadedKey = null;
        }
        this.publicKey = loadedKey;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // 1. Bypass public endpoints
        if (PUBLIC_ENDPOINTS.contains(path) || path.startsWith("/authenticationservice/")) {
            return chain.filter(exchange);
        }

        ServerHttpRequest request = exchange.getRequest();
        String authHeader = request.getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = authHeader.substring(7);

        try {
            if (publicKey != null) {
                Claims claims = Jwts.parser()
                        .verifyWith(publicKey)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                String username = claims.getSubject();
                String role = claims.get("role", String.class);
                
                if (path.startsWith(MENU_SERVICE_PREFIX) && !"MANAGER".equals(role) && !path.contains("view")) {
                    return forbidden(exchange);
                }

                ServerHttpRequest mutatedRequest = request.mutate()
                        .header("X-Username", username)
                        .header("X-User-Role", role)
                        .build();

                return chain.filter(exchange.mutate().request(mutatedRequest).build());
            }
            return chain.filter(exchange);

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