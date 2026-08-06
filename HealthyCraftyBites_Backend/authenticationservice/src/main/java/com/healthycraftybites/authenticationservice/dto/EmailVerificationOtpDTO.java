package com.healthycraftybites.authenticationservice.dto;

public class EmailVerificationOtpDTO {

    private Long entryId;
    private String emailId;
    private String otp;

    public EmailVerificationOtpDTO() {
    }

    public EmailVerificationOtpDTO(Long entryId, String emailId, String otp) {
        this.entryId = entryId;
        this.emailId = emailId;
        this.otp = otp;
    }

    public Long getEntryId() {
        return entryId;
    }

    public void setEntryId(Long entryId) {
        this.entryId = entryId;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
