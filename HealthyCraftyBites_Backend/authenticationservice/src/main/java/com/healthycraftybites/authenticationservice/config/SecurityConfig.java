package com.healthycraftybites.authenticationservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		// saltLength, hashLength, parallelism, memory(KB), iterations
		return new Argon2PasswordEncoder(16, 32, 1, 65536, 3);
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			// disable CSRF — typically fine for stateless REST APIs using tokens instead of cookies/sessions
			.csrf(csrf -> csrf.disable())

			// disable the default auto-generated login page
			.formLogin(formLogin -> formLogin.disable())

			// disable HTTP Basic auth popup (another default Spring Security adds)
			.httpBasic(httpBasic -> httpBasic.disable())

			// stateless session — no server-side session, since this is a REST API (adjust if you use sessions)
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

			// authorization rules
			.authorizeHttpRequests(auth -> auth
				.anyRequest().permitAll()
			);

		return http.build();
	}
}
