package com.healthycraftybites.analyticsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AnalyticsserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AnalyticsserviceApplication.class, args);
    }
}
