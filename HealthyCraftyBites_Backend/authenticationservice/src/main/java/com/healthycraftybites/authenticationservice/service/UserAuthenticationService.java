package com.healthycraftybites.authenticationservice.service;

import com.healthycraftybites.authenticationservice.dto.EmailVerificationOtpDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResponseDTO;
import com.healthycraftybites.authenticationservice.dto.LoginResult;
import com.healthycraftybites.authenticationservice.dto.UserDTO;

public interface UserAuthenticationService {

	UserDTO registerNewUser(UserDTO objUserDTO);

	boolean checkIfEmailExists(String emailid);

	boolean verifyOtp(EmailVerificationOtpDTO objEmailVerificationOtpDTO);

	LoginResult authenticateUser(UserDTO objUserDTO);

	LoginResponseDTO refreshAccessToken(String refreshTokenStr);

	void logoutUser(String refreshTokenStr);
}
