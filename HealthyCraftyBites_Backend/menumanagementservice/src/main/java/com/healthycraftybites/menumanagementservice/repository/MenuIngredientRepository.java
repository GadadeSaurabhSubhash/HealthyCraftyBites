package com.healthycraftybites.menumanagementservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthycraftybites.menumanagementservice.entity.Ingredient;
import com.healthycraftybites.menumanagementservice.entity.Product;

@Repository
public interface MenuIngredientRepository extends JpaRepository<Ingredient, Integer> {
	boolean existsByName(String ingredientName);
	Optional<Ingredient> findByName(String targetIngredientName);
}
