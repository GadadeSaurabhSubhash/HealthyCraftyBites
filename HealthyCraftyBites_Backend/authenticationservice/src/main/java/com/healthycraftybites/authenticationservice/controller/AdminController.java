package com.healthycraftybites.authenticationservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.dto.ApiResponse;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResponseDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResult;
import com.healthycraftybites.authenticationservice.exception.AccessDeniedException;
import com.healthycraftybites.authenticationservice.exception.InvalidRefreshTokenException;
import com.healthycraftybites.authenticationservice.service.AdminAuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/authenticationservice/adminauthentication")
public class AdminController {

	@Autowired
	AdminAuthenticationService objAdminAuthenticationService;

	
	 @PostMapping("/authenticateadmincredentials") public
	 ResponseEntity<ApiResponse<LoginResponseDTO>> authenticateAdmin(@RequestBody AdminDTO objAdminDTO, HttpServletResponse response) {
		 	LoginResult objLoginResult = objAdminAuthenticationService.authenticateAdmin(objAdminDTO);
		 	
		 	 Cookie refreshCookie = new Cookie("refreshToken", objLoginResult.getRefreshToken());
		     refreshCookie.setHttpOnly(false);
		     refreshCookie.setSecure(true);      
		     refreshCookie.setPath("/");
		     refreshCookie.setMaxAge(7 * 24 * 60 * 60); 
		     response.addCookie(refreshCookie);
		     
		     
		     LoginResponseDTO objLoginResponseDTO = new LoginResponseDTO(
		             objLoginResult.getAccessToken(),
		             objLoginResult.getRole(),
		             objLoginResult.getUsername()
		     );
		     
		     ApiResponse<LoginResponseDTO> objApiResponse = ApiResponse.success("Login Successful.", objLoginResponseDTO);
		     return new ResponseEntity<>(objApiResponse, HttpStatus.OK);
	 }
	 
	 @PostMapping("/refreshtoken")
	 public ResponseEntity<ApiResponse<LoginResponseDTO>> refreshAccessToken(
	         @CookieValue(value = "refreshToken", required = false) String refreshTokenStr) {

	     if (refreshTokenStr == null) 
	     {
	         throw new InvalidRefreshTokenException("No refresh token provided. Please login again.");
	     }

	     LoginResponseDTO objLoginResponseDTO = objAdminAuthenticationService.refreshAccessToken(refreshTokenStr);

	     ApiResponse<LoginResponseDTO> objApiResponse = ApiResponse.success("Token refreshed.", objLoginResponseDTO);
	     return new ResponseEntity<>(objApiResponse, HttpStatus.OK);
	 }
	 
	 
	 @PostMapping("/logout")
	 public ResponseEntity<ApiResponse<Void>> logout(
	         @CookieValue(value = "refreshToken", required = false) String refreshTokenStr,
	         HttpServletResponse response) {

	     if (refreshTokenStr != null) {
	         objAdminAuthenticationService.logoutAdmin(refreshTokenStr);
	     }

	    
	     Cookie refreshCookie = new Cookie("refreshToken", null);
	     refreshCookie.setHttpOnly(true);
	     refreshCookie.setSecure(false); 
	     refreshCookie.setPath("/");
	     refreshCookie.setMaxAge(0);
	     response.addCookie(refreshCookie);

	     ApiResponse<Void> objApiResponse = ApiResponse.success("Logged out successfully.", null);
	     return new ResponseEntity<>(objApiResponse, HttpStatus.OK);
	 }
	 
	 

	@PatchMapping("/changeadminpassword")
	public ResponseEntity<ApiResponse<Object>> changeAdminPassword(
			@RequestBody ChangeAdminPasswordRequestDTO objChangeAdminPasswordRequestDTO,
			@RequestHeader(value = "X-User-Role", required = false) String userRole) {
		
		if (!"MANAGER".equals(userRole)) {
	        throw new AccessDeniedException("Only MANAGER role can perform this action.");
	    }
		
		objAdminAuthenticationService.changeAdminPassword(objChangeAdminPasswordRequestDTO);

		ApiResponse<Object> response = ApiResponse.success("Password changed successfully.", null);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
