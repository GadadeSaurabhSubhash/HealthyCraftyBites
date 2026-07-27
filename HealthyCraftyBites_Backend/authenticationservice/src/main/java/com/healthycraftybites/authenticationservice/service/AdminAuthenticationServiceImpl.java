package com.healthycraftybites.authenticationservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.entity.Admin;
import com.healthycraftybites.authenticationservice.repository.AdminRepository;

@Service
public class AdminAuthenticationServiceImpl implements AdminAuthenticationService {

	@Autowired
	AdminRepository objAdminRepository;
	
	@Override
	public void authenticateAdmin(AdminDTO objAdminDTO) {
		Optional<Admin> objFoundAdmin = objAdminRepository.findById(objAdminDTO.getUserName());
		if(objFoundAdmin.isPresent()) {
		
		}
		//Incomplete
	}

}
