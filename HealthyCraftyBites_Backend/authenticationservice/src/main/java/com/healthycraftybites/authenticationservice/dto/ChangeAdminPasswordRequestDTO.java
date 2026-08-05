package com.healthycraftybites.authenticationservice.dto;

public class ChangeAdminPasswordRequestDTO {
	private String userName;
	private String currentPassword;
	private String newPassword;
	
	public ChangeAdminPasswordRequestDTO() {
		
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCurrentPassword() {
		return currentPassword;
	}
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
}
