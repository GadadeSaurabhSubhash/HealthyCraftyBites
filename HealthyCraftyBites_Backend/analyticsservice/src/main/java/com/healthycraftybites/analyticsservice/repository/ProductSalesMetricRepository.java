package com.healthycraftybites.analyticsservice.repository;

import com.healthycraftybites.analyticsservice.entity.ProductSalesMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductSalesMetricRepository extends JpaRepository<ProductSalesMetric, Long> {
    Optional<ProductSalesMetric> findByProductId(Long productId);
    Optional<ProductSalesMetric> findByProductName(String productName);
}
