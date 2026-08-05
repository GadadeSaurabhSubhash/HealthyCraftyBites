package com.healthycraftybites.authenticationservice.exception;

public class PasswordPolicyViolationException extends RuntimeException {
	public PasswordPolicyViolationException(String msg) {
		super(msg);
	}
}
