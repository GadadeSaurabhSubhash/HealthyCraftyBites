package com.healthycraftybites.authenticationservice.service;

import java.util.List;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;

public interface AdminAuthenticationService {
	public void authenticateAdmin(AdminDTO objAdminDTO);
	public List<AdminDTO> showAdmins();
}
