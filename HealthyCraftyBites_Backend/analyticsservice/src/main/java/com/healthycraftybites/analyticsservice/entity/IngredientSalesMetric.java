package com.healthycraftybites.analyticsservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient_sales_metrics")
public class IngredientSalesMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ingredient_id")
    private Long ingredientId;

    @Column(name = "ingredient_name")
    private String ingredientName;

    @Column(name = "quantity_sold")
    private Integer quantitySold = 0;

    public IngredientSalesMetric() {}

    public IngredientSalesMetric(Long ingredientId, String ingredientName, Integer quantitySold) {
        this.ingredientId = ingredientId;
        this.ingredientName = ingredientName;
        this.quantitySold = quantitySold;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getIngredientId() { return ingredientId; }
    public void setIngredientId(Long ingredientId) { this.ingredientId = ingredientId; }

    public String getIngredientName() { return ingredientName; }
    public void setIngredientName(String ingredientName) { this.ingredientName = ingredientName; }

    public Integer getQuantitySold() { return quantitySold; }
    public void setQuantitySold(Integer quantitySold) { this.quantitySold = quantitySold; }
}
