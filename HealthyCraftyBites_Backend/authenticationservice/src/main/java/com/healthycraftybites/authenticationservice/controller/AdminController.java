package com.healthycraftybites.authenticationservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.dto.ApiResponse;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResponseDTO;
import com.healthycraftybites.authenticationservice.service.AdminAuthenticationService;

@RestController
@RequestMapping("/authenticationservice/adminauthentication")
public class AdminController {

	@Autowired
	AdminAuthenticationService objAdminAuthenticationService;
	
	/*
	 * @PostMapping("/authenticateadmincredentials") public
	 * ResponseEntity<ApiResponse<LoginResponseDTO>> authenticateAdmin(@RequestBody
	 * AdminDTO objAdminDTO) {
	 * 
	 * }
	 */
	
	@PatchMapping("/changeadminpassword")
	public ResponseEntity<ApiResponse<Object>> changeAdminPassword(@RequestBody ChangeAdminPasswordRequestDTO objChangeAdminPasswordRequestDTO)
	{
		objAdminAuthenticationService.changeAdminPassword(objChangeAdminPasswordRequestDTO);
		
	    ApiResponse<Object> response = ApiResponse.success("Password changed successfully.",null);
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
