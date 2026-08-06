package com.healthycraftybites.authenticationservice.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthycraftybites.authenticationservice.dto.EmailVerificationOtpDTO;
import com.healthycraftybites.authenticationservice.dto.UserDTO;
import com.healthycraftybites.authenticationservice.entity.EmailVerificationOtp;
import com.healthycraftybites.authenticationservice.entity.User;
import com.healthycraftybites.authenticationservice.exception.DuplicateItemException;
import com.healthycraftybites.authenticationservice.repository.EmailVerificationOtpRepository;
import com.healthycraftybites.authenticationservice.repository.UserRepository;
import com.healthycraftybites.authenticationservice.util.OtpGenerator;

import jakarta.transaction.Transactional;

import com.healthycraftybites.authenticationservice.feign.NotificationFeignClient;

@Service
public class UserAuthenticationServiceImpl implements UserAuthenticationService{

	@Autowired
	UserRepository objUserRepository; 
	@Autowired
	PasswordEncoder objPasswordEncoder;
	@Autowired
	NotificationFeignClient objNotificationFeignClient;
	@Autowired
	EmailVerificationOtpRepository objEmailVerificationOtpRepository; 
	
	
	@Override
	public UserDTO registerNewUser(UserDTO objUserDTO) {
		if(objUserRepository.existsByEmailId(objUserDTO.getEmailId())) {
			throw new DuplicateItemException("Email already registered");
		}
		
		if(objUserRepository.existsByMobileNumber(objUserDTO.getMobileNumber())) {
			throw new DuplicateItemException("Mobile Number already registered");
		}
		
		User objUserToRegister = new User();
		BeanUtils.copyProperties(objUserDTO, objUserToRegister);
		objUserToRegister.setPassword(objPasswordEncoder.encode(objUserDTO.getPassword()));
		objUserRepository.save(objUserToRegister);
		
		UserDTO response = new UserDTO();
		BeanUtils.copyProperties(objUserToRegister,response);
		response.setPassword(null);
		return response;
	}

	@Transactional
	@Override
	public boolean checkIfEmailExists(String emailid) {
		 boolean result = objUserRepository.existsByEmailId(emailid);
		 if(result==false) {
			 boolean OTpAlreadyGenerated = objEmailVerificationOtpRepository.existsByEmailId(emailid);
			 if(OTpAlreadyGenerated) {
				 objEmailVerificationOtpRepository.deleteAllByEmailId(emailid);
			 }
			 
			 String Otp = OtpGenerator.generateOTP();
			 
			 objNotificationFeignClient.sendOtp(emailid, Otp);
			 
			 EmailVerificationOtp objEmailVerificationOtp = new EmailVerificationOtp();
			 objEmailVerificationOtp.setEmailId(emailid);
			 objEmailVerificationOtp.setOtp(Otp);
			 objEmailVerificationOtpRepository.save(objEmailVerificationOtp);
			
			 return false;
		 }
		 
		 return result;
	}

	@Override
	public boolean verifyOtp(EmailVerificationOtpDTO objEmailVerificationOtpDTO) {
			Optional<EmailVerificationOtp> objOptionalEmailVerificationOtp = objEmailVerificationOtpRepository.findByEmailId(objEmailVerificationOtpDTO.getEmailId());
			if(objOptionalEmailVerificationOtp.isPresent()) {
				EmailVerificationOtp objEmailVerificationOtp = new EmailVerificationOtp();
				BeanUtils.copyProperties(objOptionalEmailVerificationOtp.get(), objEmailVerificationOtp);
				
				if(objEmailVerificationOtp.getOtp().equals(objEmailVerificationOtpDTO.getOtp())) {
					return true;
				}
			}
			return false;
	}
}
