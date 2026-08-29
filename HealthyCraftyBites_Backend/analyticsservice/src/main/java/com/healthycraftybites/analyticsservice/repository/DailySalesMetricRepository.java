package com.healthycraftybites.analyticsservice.repository;

import com.healthycraftybites.analyticsservice.entity.DailySalesMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface DailySalesMetricRepository extends JpaRepository<DailySalesMetric, Long> {
    Optional<DailySalesMetric> findByMetricDate(LocalDate metricDate);
}
