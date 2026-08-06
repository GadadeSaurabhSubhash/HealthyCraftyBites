package com.healthycraftybites.notificationservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationServiceImpl implements EmailNotificationService{

	@Autowired
    private JavaMailSender objJavaMailSender;
	
	@Async
	@Override
	public void sendOtpEmail(String emailId, String otp) {
		SimpleMailMessage objMessage = new SimpleMailMessage();
        objMessage.setTo(emailId);
        objMessage.setSubject("Your OTP for New User Registration @ Healthy Crafty Bites");
        objMessage.setText("Your OTP for Email Authentication is: " + otp + "\nThank You\nTeam Healthy Crafty Bites");

        objJavaMailSender.send(objMessage);
		
	}
	
}
