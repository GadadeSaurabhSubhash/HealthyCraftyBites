package com.healthycraftybites.analyticsservice.repository;

import com.healthycraftybites.analyticsservice.entity.IngredientSalesMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientSalesMetricRepository extends JpaRepository<IngredientSalesMetric, Long> {
    Optional<IngredientSalesMetric> findByIngredientId(Long ingredientId);
    Optional<IngredientSalesMetric> findByIngredientName(String ingredientName);
}
