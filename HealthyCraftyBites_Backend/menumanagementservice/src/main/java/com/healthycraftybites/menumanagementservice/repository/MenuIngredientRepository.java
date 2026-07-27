package com.healthycraftybites.menumanagementservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthycraftybites.menumanagementservice.entity.Ingredient;

@Repository
public interface MenuIngredientRepository extends JpaRepository<Ingredient, Integer> {
	boolean existsByName(String ingredientName);
}
