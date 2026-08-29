package com.healthycraftybites.paymentbillingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PaymentbillingserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaymentbillingserviceApplication.class, args);
    }
}
