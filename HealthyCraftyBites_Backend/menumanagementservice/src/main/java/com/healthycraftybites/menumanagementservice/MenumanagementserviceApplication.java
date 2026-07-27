package com.healthycraftybites.menumanagementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.healthycraftybites.menumanagementservice.controller","com.healthycraftybites.menumanagementservice.service","com.healthycraftybites.menumanagementservice.exception"})
@EnableJpaRepositories(basePackages = "com.healthycraftybites.menumanagementservice.repository")
@EntityScan(basePackages = "com.healthycraftybites.menumanagementservice.entity")
public class MenumanagementserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MenumanagementserviceApplication.class, args);
	}

}
