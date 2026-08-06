package com.healthycraftybites.authenticationservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthycraftybites.authenticationservice.entity.EmailVerificationOtp;



@Repository
public interface EmailVerificationOtpRepository extends JpaRepository<EmailVerificationOtp,Long> {
	boolean existsByEmailId(String emailId);
	Optional<EmailVerificationOtp> findByEmailId(String emailId);
	void deleteAllByEmailId(String email); 
}
