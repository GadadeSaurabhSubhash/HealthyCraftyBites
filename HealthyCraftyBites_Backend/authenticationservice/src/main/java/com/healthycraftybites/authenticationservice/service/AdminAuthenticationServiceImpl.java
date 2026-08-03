package com.healthycraftybites.authenticationservice.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;
import com.healthycraftybites.authenticationservice.entity.Admin;
import com.healthycraftybites.authenticationservice.exception.InvalidCredentialsException;
import com.healthycraftybites.authenticationservice.exception.PasswordPolicyViolationException;
import com.healthycraftybites.authenticationservice.repository.AdminRepository;

@Service
public class AdminAuthenticationServiceImpl implements AdminAuthenticationService {

	@Autowired
	AdminRepository objAdminRepository;
	@Autowired
	PasswordEncoder objPasswordEncoder;
	
	@Override
	public void authenticateAdmin(AdminDTO objAdminDTO) {
		Optional<Admin> objFoundAdmin = objAdminRepository.findById(objAdminDTO.getUserName());
		if(objFoundAdmin.isPresent()) {
		
		}
		//Incomplete
	}

	@Override
	public void changeAdminPassword(ChangeAdminPasswordRequestDTO objChangeAdminPasswordRequestDTO) {
		Optional<Admin> objOptionalTargetAdmin = objAdminRepository.findById(objChangeAdminPasswordRequestDTO.getUserName());
		if(objOptionalTargetAdmin.isPresent()) {
			Admin objTargetAdmin = new Admin();
			BeanUtils.copyProperties(objOptionalTargetAdmin.get(), objTargetAdmin);
			
			boolean isPasswordMatch = objPasswordEncoder.matches(objChangeAdminPasswordRequestDTO.getCurrentPassword(), objTargetAdmin.getPassword());
	        if (!isPasswordMatch) {
	            throw new InvalidCredentialsException("Invalid credentials. Please enter the valid Current Password!");
	        }
	        
	        if (objPasswordEncoder.matches(objChangeAdminPasswordRequestDTO.getNewPassword(), objTargetAdmin.getPassword())) {
	            throw new PasswordPolicyViolationException("New password must be different from the current password.");
	        }
	        
	        String encodedNewPassword = objPasswordEncoder.encode(objChangeAdminPasswordRequestDTO.getNewPassword());
	        objTargetAdmin.setPassword(encodedNewPassword);
	        objAdminRepository.save(objTargetAdmin);
			
		}else {
			throw new InvalidCredentialsException("Invalid credentails. Please enter the valid Username!");
		}
		
	}

}
