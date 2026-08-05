package com.healthycraftybites.authenticationservice.service;
import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResponseDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResult;
import com.healthycraftybites.authenticationservice.entity.Admin;

public interface AdminAuthenticationService {

	public LoginResult authenticateAdmin(AdminDTO objAdminDTO);
	public void changeAdminPassword(ChangeAdminPasswordRequestDTO objChangeAdminPasswordRequestDTO);
	public LoginResponseDTO refreshAccessToken(String refreshTokenStr);
	public void logoutAdmin(String refreshTokenStr);
}
