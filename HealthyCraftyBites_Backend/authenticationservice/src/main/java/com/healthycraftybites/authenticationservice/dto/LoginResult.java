package com.healthycraftybites.authenticationservice.dto;

public class LoginResponseDTO {

    private String accessToken;
    private String role;
    private String username;

    public LoginResponseDTO(String accessToken, String role, String username) {
        this.accessToken = accessToken;
        this.role = role;
        this.username = username;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRole() {
        return role;
    }

    public String getUsername() {
        return username;
    }
}
