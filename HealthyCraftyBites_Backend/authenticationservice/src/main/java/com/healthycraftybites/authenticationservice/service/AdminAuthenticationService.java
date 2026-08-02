package com.healthycraftybites.authenticationservice.service;
import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;

public interface AdminAuthenticationService {
	public void authenticateAdmin(AdminDTO objAdminDTO);

	public void changeAdminPassword(ChangeAdminPasswordRequestDTO objChangeAdminPasswordRequestDTO);
}
