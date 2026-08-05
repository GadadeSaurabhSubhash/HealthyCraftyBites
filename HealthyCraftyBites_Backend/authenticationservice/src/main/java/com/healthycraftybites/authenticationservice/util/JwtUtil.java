package com.healthycraftybites.authenticationservice.util;

import com.healthycraftybites.authenticationservice.entity.Admin;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.PrivateKey;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

public class JwtUtil {

    private static final long ACCESS_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

    public static String generateAccessToken(Admin admin, PrivateKey privateKey) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + ACCESS_TOKEN_EXPIRY_MS);

        return Jwts.builder()
                .subject(admin.getUserName())
                .claim("role", admin.getRole())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(privateKey, SignatureAlgorithm.RS256)
                .compact();
    }
    
    public static String generateRefreshToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[64];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
