package com.healthycraftybites.authenticationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthycraftybites.authenticationservice.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

}
