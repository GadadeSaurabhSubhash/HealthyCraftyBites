package com.healthycraftybites.authenticationservice.dto;

public class AdminDTO {
	
	private String storeId;
	private String userName;
	private String password;
	

	public AdminDTO() {
		
	}
	
	public AdminDTO(String storeId, String userName, String password) {
		super();
		this.storeId = storeId;
		this.userName = userName;
		this.password = password;
	}


	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
