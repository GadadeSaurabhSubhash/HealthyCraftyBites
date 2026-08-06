package com.healthycraftybites.authenticationservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.authenticationservice.dto.ApiResponse;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;
import com.healthycraftybites.authenticationservice.dto.EmailVerificationOtpDTO;
import com.healthycraftybites.authenticationservice.dto.UserDTO;
import com.healthycraftybites.authenticationservice.exception.AccessDeniedException;
import com.healthycraftybites.authenticationservice.service.UserAuthenticationService;

@RestController
@RequestMapping("/authenticationservice/userauthentication")
public class UserController {
	@Autowired
	UserAuthenticationService objUserAuthenticationService;
	
	@PostMapping("userregistration")
	public ResponseEntity<ApiResponse<UserDTO>> registerNewUser(@RequestBody UserDTO objUserDTO)
	{
		UserDTO objRegisteredUser = objUserAuthenticationService.registerNewUser(objUserDTO);
		
		ApiResponse<UserDTO> response = ApiResponse.success("User Registration successful", objRegisteredUser);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	@GetMapping("checkifemailexists")
	public ResponseEntity<ApiResponse<Boolean>> checkIfEmailExists(@RequestParam("emailId") String emailid) {
	    boolean exists = objUserAuthenticationService.checkIfEmailExists(emailid);
	    if(exists) {
	    		ApiResponse<Boolean> response = ApiResponse.success("Email check completed ", exists);
		    return new ResponseEntity<>(response, HttpStatus.OK);
	    }else {
	    	ApiResponse<Boolean> response = ApiResponse.success("New Email Found. OTP Send To Email ID", exists);
		    return new ResponseEntity<>(response, HttpStatus.OK);
	    }
	}
	
	@PostMapping("verifyotp")
	public ResponseEntity<ApiResponse<Boolean>> verifyOtp(@RequestBody EmailVerificationOtpDTO objEmailVerificationOtpDTO) {
	    boolean isValid = objUserAuthenticationService.verifyOtp(objEmailVerificationOtpDTO);
	    	ApiResponse<Boolean> response = ApiResponse.success("OTP Verification Successful!", isValid);
		    
	    	return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
}
