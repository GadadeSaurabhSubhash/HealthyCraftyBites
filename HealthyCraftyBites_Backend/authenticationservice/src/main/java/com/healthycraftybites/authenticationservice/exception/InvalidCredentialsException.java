package com.healthycraftybites.authenticationservice.exception;

public class InvalidCredentialsException extends RuntimeException  {
	public InvalidCredentialsException(String message) {
		super(message);
	}
}
