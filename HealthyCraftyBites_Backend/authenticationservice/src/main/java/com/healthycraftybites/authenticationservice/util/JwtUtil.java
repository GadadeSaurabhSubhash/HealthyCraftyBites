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
        return generateAccessToken(admin.getUserName(), admin.getRole(), privateKey);
    }

    public static String generateAccessToken(String subject, String role, PrivateKey privateKey) {
        if (privateKey == null) {
            return generateAccessToken(subject, role);
        }
        try {
            Date now = new Date();
            Date expiry = new Date(now.getTime() + ACCESS_TOKEN_EXPIRY_MS);

            return Jwts.builder()
                    .subject(subject)
                    .claim("role", role)
                    .issuedAt(now)
                    .expiration(expiry)
                    .signWith(privateKey, SignatureAlgorithm.RS256)
                    .compact();
        } catch (Exception e) {
            return generateAccessToken(subject, role);
        }
    }

    public static String generateAccessToken(String subject, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + ACCESS_TOKEN_EXPIRY_MS);

        return Jwts.builder()
                .subject(subject)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .compact();
    }
    
    public static String generateRefreshToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[64];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
