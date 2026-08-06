package com.healthycraftybites.authenticationservice.dto;

public class UserDTO {

    private Long userId;
    private String fullName;
    private String emailId;
    private String mobileNumber;
    private String password;

    public UserDTO() {
    }

    public UserDTO(Long userId, String fullName, String emailId,
                   String mobileNumber, String password) {
        this.userId = userId;
        this.fullName = fullName;
        this.emailId = emailId;
        this.mobileNumber = mobileNumber;
        this.password = password;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
