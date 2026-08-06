package com.healthycraftybites.notificationservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.notificationservice.service.EmailNotificationService;

@RestController
@RequestMapping("/notificationservice/emailnotification")
public class EmailNotificationController {

    @Autowired
    private EmailNotificationService objEmailNotificationService;

    @PostMapping("/sendotp")
    public ResponseEntity<String> sendOtp(
            @RequestParam String emailId,
            @RequestParam String otp) {

    	objEmailNotificationService.sendOtpEmail(emailId, otp);

        return ResponseEntity.ok("OTP sent successfully");
    }
}
