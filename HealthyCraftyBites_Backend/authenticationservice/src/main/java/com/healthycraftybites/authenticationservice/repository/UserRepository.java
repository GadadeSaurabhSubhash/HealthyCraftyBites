package com.healthycraftybites.authenticationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthycraftybites.authenticationservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByEmailId(String emailid);
	boolean existsByMobileNumber(String mobilenumber);
}
