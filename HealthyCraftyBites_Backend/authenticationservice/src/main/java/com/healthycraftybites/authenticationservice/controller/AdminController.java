package com.healthycraftybites.authenticationservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.service.AdminAuthenticationService;

@RestController
@RequestMapping("/authenticationservice/adminauth")
public class AdminController {

	@Autowired
	AdminAuthenticationService objAdminAuthenticationService;
	
	@PostMapping("/authadmincredentials")
	public void authenticateAdmin(@RequestBody AdminDTO objAdminDTO) {
		objAdminAuthenticationService.authenticateAdmin(objAdminDTO);
	}
	
	@GetMapping("/showadmins")
	public List<AdminDTO> authenticateAdmin() {
		return objAdminAuthenticationService.showAdmins();
	}
}
