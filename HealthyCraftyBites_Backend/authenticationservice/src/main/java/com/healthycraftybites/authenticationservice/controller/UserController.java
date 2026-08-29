package com.healthycraftybites.authenticationservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.authenticationservice.dto.ApiResponse;
import com.healthycraftybites.authenticationservice.dto.EmailVerificationOtpDTO;
import com.healthycraftybites.authenticationservice.dto.UserDTO;
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

	@PostMapping("authenticateusercredentials")
	public ResponseEntity<ApiResponse<com.healthycraftybites.authenticationservice.dto.LoginResponseDTO>> authenticateUser(
			@RequestBody UserDTO objUserDTO, jakarta.servlet.http.HttpServletResponse response) {
		try {
			com.healthycraftybites.authenticationservice.dto.LoginResult objLoginResult = objUserAuthenticationService.authenticateUser(objUserDTO);

			jakarta.servlet.http.Cookie refreshCookie = new jakarta.servlet.http.Cookie("refreshToken", objLoginResult.getRefreshToken());
			refreshCookie.setHttpOnly(false);
			refreshCookie.setSecure(false);
			refreshCookie.setPath("/");
			refreshCookie.setMaxAge(7 * 24 * 60 * 60);
			response.addCookie(refreshCookie);

			com.healthycraftybites.authenticationservice.dto.LoginResponseDTO objLoginResponseDTO = new com.healthycraftybites.authenticationservice.dto.LoginResponseDTO(
					objLoginResult.getAccessToken(),
					objLoginResult.getRole(),
					objLoginResult.getUsername()
			);

			ApiResponse<com.healthycraftybites.authenticationservice.dto.LoginResponseDTO> objApiResponse = ApiResponse.success("User Login Successful.", objLoginResponseDTO);
			return new ResponseEntity<>(objApiResponse, HttpStatus.OK);
		} catch (com.healthycraftybites.authenticationservice.exception.InvalidCredentialsException ex) {
			return new ResponseEntity<>(ApiResponse.failure(ex.getMessage()), HttpStatus.UNAUTHORIZED);
		} catch (Exception ex) {
			return new ResponseEntity<>(ApiResponse.failure("Login Failed: " + ex.getMessage()), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/refreshtoken")
	public ResponseEntity<ApiResponse<com.healthycraftybites.authenticationservice.dto.LoginResponseDTO>> refreshAccessToken(
			@org.springframework.web.bind.annotation.CookieValue(value = "refreshToken", required = false) String refreshTokenStr) {
		if (refreshTokenStr == null || refreshTokenStr.trim().isEmpty()) {
			return new ResponseEntity<>(ApiResponse.failure("No refresh token provided."), HttpStatus.UNAUTHORIZED);
		}
		try {
			com.healthycraftybites.authenticationservice.dto.LoginResponseDTO objLoginResponseDTO = objUserAuthenticationService.refreshAccessToken(refreshTokenStr);
			ApiResponse<com.healthycraftybites.authenticationservice.dto.LoginResponseDTO> objApiResponse = ApiResponse.success("Token refreshed.", objLoginResponseDTO);
			return new ResponseEntity<>(objApiResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(ApiResponse.failure("Refresh token expired or invalid."), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<Void>> logout(
			@org.springframework.web.bind.annotation.CookieValue(value = "refreshToken", required = false) String refreshTokenStr,
			jakarta.servlet.http.HttpServletResponse response) {
		if (refreshTokenStr != null) {
			try {
				objUserAuthenticationService.logoutUser(refreshTokenStr);
			} catch (Exception e) {}
		}
		jakarta.servlet.http.Cookie refreshCookie = new jakarta.servlet.http.Cookie("refreshToken", null);
		refreshCookie.setHttpOnly(true);
		refreshCookie.setSecure(false);
		refreshCookie.setPath("/");
		refreshCookie.setMaxAge(0);
		response.addCookie(refreshCookie);

		ApiResponse<Void> objApiResponse = ApiResponse.success("User logged out successfully.", null);
		return new ResponseEntity<>(objApiResponse, HttpStatus.OK);
	}
}
