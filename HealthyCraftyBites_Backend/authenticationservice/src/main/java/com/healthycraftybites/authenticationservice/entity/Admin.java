package com.healthycraftybites.authenticationservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin_details")
public class Admin {
	
	@Column(name = "storeid")
	private String storeId;

	@Id
	@Column(name = "username")
	private String userName;

	@Column(name = "password")
	private String password;
	

	
	public Admin() {
		
	}
	
	public Admin(String storeId, String userName, String password) {
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
