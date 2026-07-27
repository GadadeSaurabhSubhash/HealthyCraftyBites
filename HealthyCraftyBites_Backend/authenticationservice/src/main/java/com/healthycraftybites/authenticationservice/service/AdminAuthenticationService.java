package com.healthycraftybites.authenticationservice.service;
import com.healthycraftybites.authenticationservice.dto.AdminDTO;

public interface AdminAuthenticationService {
	public void authenticateAdmin(AdminDTO objAdminDTO);
}
