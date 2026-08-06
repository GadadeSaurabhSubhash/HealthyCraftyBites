package com.healthycraftybites.authenticationservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "email_verification_otp")
public class EmailVerificationOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id")
    private Long entryId;

    @Column(name = "email_id", nullable = false)
    private String emailId;

    @Column(name = "otp", nullable = false, length = 6)
    private String otp;

    public EmailVerificationOtp() {
    }

    public EmailVerificationOtp(String emailId, String otp) {
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
