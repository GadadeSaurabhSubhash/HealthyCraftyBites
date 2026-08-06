package com.healthycraftybites.authenticationservice.service;

import com.healthycraftybites.authenticationservice.dto.EmailVerificationOtpDTO;
import com.healthycraftybites.authenticationservice.dto.UserDTO;

public interface UserAuthenticationService {

	UserDTO registerNewUser(UserDTO objUserDTO);

	boolean checkIfEmailExists(String emailid);

	boolean verifyOtp(EmailVerificationOtpDTO objEmailVerificationOtpDTO);

}
