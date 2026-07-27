package com.healthycraftybites.authenticationservice.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.entity.Admin;
import com.healthycraftybites.authenticationservice.repository.AdminRepository;
import java.util.List;

@Service
public class AdminAuthenticationServiceImpl implements AdminAuthenticationService {

	@Autowired
	AdminRepository objAdminRepository;
	
	@Override
	public void authenticateAdmin(AdminDTO objAdminDTO) {
		Optional<Admin> objFoundAdmin = objAdminRepository.findById(objAdminDTO.getUserName());
		if(objFoundAdmin.isPresent()) {
		
		}
	}

	@Override
	public List<AdminDTO> showAdmins() {

	    Iterator<Admin> objAdminList = objAdminRepository.findAll().iterator();
	    List<AdminDTO> objAdminListDTO = new ArrayList<>();

	    while (objAdminList.hasNext()) {

	        Admin objAdmin = objAdminList.next();

	        AdminDTO objAdminDTO = new AdminDTO();

	        objAdminDTO.setStoreId(objAdmin.getStoreId());
	        objAdminDTO.setUserName(objAdmin.getUserName());
	        objAdminDTO.setPassword(objAdmin.getPassword());

	        objAdminListDTO.add(objAdminDTO);
	    }

	    return objAdminListDTO;
	}

}
