package com.healthycraftybites.authenticationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.healthycraftybites.authenticationservice.service","com.healthycraftybites.authenticationservice.controller","com.healthycraftybites.authenticationservice.config"})
@EntityScan(basePackages = "com.healthycraftybites.authenticationservice.entity")
@EnableJpaRepositories(basePackages="com.healthycraftybites.authenticationservice.repository" )
public class AuthenticationserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticationserviceApplication.class, args);
	}

}
