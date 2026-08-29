package com.healthycraftybites.orderservice.service;

import com.healthycraftybites.orderservice.event.OrderPlacedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderKafkaProducer {

    private static final String TOPIC = "order-placed-topic";

    @Autowired(required = false)
    private KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    public void sendOrderPlacedEvent(OrderPlacedEvent event) {
        if (kafkaTemplate != null) {
            try {
                kafkaTemplate.send(TOPIC, event.getOrderNumber(), event);
                System.out.println("Kafka Event Published: OrderPlacedEvent for " + event.getOrderNumber());
            } catch (Exception e) {
                System.err.println("Kafka Producer Exception (Kafka might be offline): " + e.getMessage());
            }
        } else {
            System.out.println("KafkaTemplate not configured; skipping Kafka event publication.");
        }
    }
}
