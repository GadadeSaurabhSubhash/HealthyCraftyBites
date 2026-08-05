package com.healthycraftybites.authenticationservice.service;

import java.security.PrivateKey;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthycraftybites.authenticationservice.dto.AdminDTO;
import com.healthycraftybites.authenticationservice.dto.ChangeAdminPasswordRequestDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResponseDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResult;
import com.healthycraftybites.authenticationservice.entity.Admin;
import com.healthycraftybites.authenticationservice.entity.RefreshToken;
import com.healthycraftybites.authenticationservice.exception.InvalidCredentialsException;
import com.healthycraftybites.authenticationservice.exception.InvalidRefreshTokenException;
import com.healthycraftybites.authenticationservice.exception.PasswordPolicyViolationException;
import com.healthycraftybites.authenticationservice.repository.AdminRepository;
import com.healthycraftybites.authenticationservice.repository.RefreshTokenRepository;
import com.healthycraftybites.authenticationservice.util.JwtUtil;
import com.healthycraftybites.authenticationservice.util.KeyLoader;

import jakarta.transaction.Transactional;

@Service
public class AdminAuthenticationServiceImpl implements AdminAuthenticationService {

	@Autowired
	AdminRepository objAdminRepository;
	@Autowired
	RefreshTokenRepository objRefreshTokenRepository;
	@Autowired
	PasswordEncoder objPasswordEncoder;
	
	private final PrivateKey privateKey;
	
	public AdminAuthenticationServiceImpl() throws Exception {
		this.privateKey = KeyLoader.loadPrivateKey("keys/private_key.pem");
	}
	
	
	@Override
	public LoginResult authenticateAdmin(AdminDTO objAdminDTO) {
		
		//verfied whether user with the entered username exists or not
		Optional<Admin> objOptionalAdmin = objAdminRepository.findById(objAdminDTO.getUserName());
		Admin objAdmin = new Admin();
		if(objOptionalAdmin.isPresent()) {
			BeanUtils.copyProperties(objOptionalAdmin.get(), objAdmin);
		}
		else {
			throw new InvalidCredentialsException("Invalid Username or Password! Please Try Again.");
		}
		
		//verified password
		if(!objPasswordEncoder.matches(objAdminDTO.getPassword(), objAdmin.getPassword()))
		{
			throw new InvalidCredentialsException("Invalid Username or Password! Please Try Again.");
		}
		
		//generate tokens
		String accessToken = JwtUtil.generateAccessToken(objAdmin, privateKey);
		String refreshTokenStr = JwtUtil.generateRefreshToken();
		
		//persist refresh token in DB
		 RefreshToken refreshToken = new RefreshToken();
	     refreshToken.setToken(refreshTokenStr);
	     refreshToken.setUsername(objAdmin.getUserName());
	     refreshToken.setExpiryDate(LocalDateTime.now().plusDays(7));
	     objRefreshTokenRepository.save(refreshToken);
		
	     return new LoginResult(accessToken, refreshTokenStr, objAdmin.getRole(), objAdmin.getUserName());
	}

	@Transactional
	@Override
	public LoginResponseDTO refreshAccessToken(String refreshTokenStr) {
		Optional<RefreshToken> objOptionalRefreshToken = objRefreshTokenRepository.findByToken(refreshTokenStr);
		RefreshToken objRefreshToken = new RefreshToken();
		if(objOptionalRefreshToken.isPresent()) {
			BeanUtils.copyProperties(objOptionalRefreshToken.get(), objRefreshToken);
		}
		else {
			throw new InvalidRefreshTokenException("Invalid refresh token. Please login again.");
		}
		
		if (objRefreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
	        objRefreshTokenRepository.delete(objRefreshToken);
	        throw new InvalidRefreshTokenException("Refresh token expired. Please login again.");
	    }
		
		
		Optional<Admin> objOptionalAdmin = objAdminRepository.findById(objRefreshToken.getUsername());
		Admin objAdmin = new Admin();
		if(objOptionalAdmin.isPresent()) {
			BeanUtils.copyProperties(objOptionalAdmin.get(), objAdmin);
		}
		else {
			throw new InvalidCredentialsException("Invalid Username or Password! Please Try Again.");
		}
		
		String newAccessToken = JwtUtil.generateAccessToken(objAdmin, privateKey);
		
		return new LoginResponseDTO(newAccessToken, objAdmin.getRole(), objAdmin.getUserName());
		
	}
	
	
	@Override
	public void changeAdminPassword(ChangeAdminPasswordRequestDTO objChangeAdminPasswordRequestDTO) {
		Optional<Admin> objOptionalTargetAdmin = objAdminRepository.findById(objChangeAdminPasswordRequestDTO.getUserName());
		if(objOptionalTargetAdmin.isPresent()) {
			Admin objTargetAdmin = new Admin();
			BeanUtils.copyProperties(objOptionalTargetAdmin.get(), objTargetAdmin);
			
			boolean isPasswordMatch = objPasswordEncoder.matches(objChangeAdminPasswordRequestDTO.getCurrentPassword(), objTargetAdmin.getPassword());
	        if (!isPasswordMatch) {
	            throw new InvalidCredentialsException("Invalid credentials. Please enter the valid Current Password!");
	        }
	        
	        if (objPasswordEncoder.matches(objChangeAdminPasswordRequestDTO.getNewPassword(), objTargetAdmin.getPassword())) {
	            throw new PasswordPolicyViolationException("New password must be different from the current password.");
	        }
	        
	        String encodedNewPassword = objPasswordEncoder.encode(objChangeAdminPasswordRequestDTO.getNewPassword());
	        objTargetAdmin.setPassword(encodedNewPassword);
	        objAdminRepository.save(objTargetAdmin);
			
		}else {
			throw new InvalidCredentialsException("Invalid credentails. Please enter the valid Username!");
		}
		
	}


	@Transactional
	@Override
	public void logoutAdmin(String refreshTokenStr) {
		objRefreshTokenRepository.deleteByToken(refreshTokenStr);
	}


	


}
