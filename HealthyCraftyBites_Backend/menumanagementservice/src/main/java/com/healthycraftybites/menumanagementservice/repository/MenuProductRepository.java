package com.healthycraftybites.menumanagementservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthycraftybites.menumanagementservice.entity.Product;

@Repository
public interface MenuProductRepository extends JpaRepository<Product, Integer> {
	boolean existsByName(String productName);
}
