package com.healthycraftybites.authenticationservice.util;

import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class KeyLoader {

    public static PrivateKey loadPrivateKey(String resourcePath) throws Exception {
        InputStream is = KeyLoader.class.getClassLoader().getResourceAsStream(resourcePath);
        if (is == null) {
            return null;
        }
        byte[] bytes = is.readAllBytes();
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        String key = new String(bytes)
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s", "");

        byte[] decoded = Base64.getDecoder().decode(key);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePrivate(spec);
    }

    public static PublicKey loadPublicKey(String resourcePath) throws Exception {
        InputStream is = KeyLoader.class.getClassLoader().getResourceAsStream(resourcePath);
        if (is == null) {
            return null;
        }
        byte[] bytes = is.readAllBytes();
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        String key = new String(bytes)
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");

        byte[] decoded = Base64.getDecoder().decode(key);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePublic(spec);
    }
}