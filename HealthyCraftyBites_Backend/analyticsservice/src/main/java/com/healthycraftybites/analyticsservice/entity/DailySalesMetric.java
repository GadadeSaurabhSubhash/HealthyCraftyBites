package com.healthycraftybites.analyticsservice.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "daily_sales_metric")
public class DailySalesMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metric_id")
    private Long metricId;

    @Column(name = "metric_date", unique = true, nullable = false)
    private LocalDate metricDate;

    @Column(name = "total_orders")
    private Integer totalOrders = 0;

    @Column(name = "total_revenue")
    private BigDecimal totalRevenue = BigDecimal.ZERO;

    @Column(name = "customised_meals_count")
    private Integer customisedMealsCount = 0;

    public DailySalesMetric() {}

    public Long getMetricId() { return metricId; }
    public void setMetricId(Long metricId) { this.metricId = metricId; }

    public LocalDate getMetricDate() { return metricDate; }
    public void setMetricDate(LocalDate metricDate) { this.metricDate = metricDate; }

    public Integer getTotalOrders() { return totalOrders; }
    public void setTotalOrders(Integer totalOrders) { this.totalOrders = totalOrders; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }

    public Integer getCustomisedMealsCount() { return customisedMealsCount; }
    public void setCustomisedMealsCount(Integer customisedMealsCount) { this.customisedMealsCount = customisedMealsCount; }
}
