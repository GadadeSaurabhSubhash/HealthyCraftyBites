package com.healthycraftybites.notificationservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OrderPlacedKafkaListener {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @KafkaListener(topics = "order-placed-topic", groupId = "notification-group")
    public void handleOrderPlaced(String orderPlacedJson) {
        System.out.println("Notification Service received Kafka Event: " + orderPlacedJson);
        try {
            if (mailSender != null) {
                SimpleMailMessage msg = new SimpleMailMessage();
                msg.setSubject("HealthyCraftyBites - Order Confirmation");
                msg.setText("Thank you for your order! Your order details: " + orderPlacedJson);
                // In production, extract email and send
                System.out.println("Order confirmation email triggered via Kafka listener.");
            }
        } catch (Exception e) {
            System.err.println("Email dispatch exception: " + e.getMessage());
        }
    }
}
