package com.healthycraftybites.menumanagementservice.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private int ingredientId;

    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "img_name")
    private String imgName;

    @Column(name = "calories")
    private BigDecimal calories;

    @Column(name = "protein")
    private BigDecimal protein;

    @Column(name = "carbohydrates")
    private BigDecimal carbohydrates;

    @Column(name = "fat")
    private BigDecimal fat;

    @Column(name = "fiber")
    private BigDecimal fiber;

    @Column(name = "availability_status")
    private int availabilityStatus;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    
    
    
    public Ingredient() {
    }


    
    
	public int getIngredientId() {
		return ingredientId;
	}


	public void setIngredientId(int ingredientId) {
		this.ingredientId = ingredientId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public String getImgName() {
		return imgName;
	}


	public void setImgName(String imgName) {
		this.imgName = imgName;
	}


	public BigDecimal getCalories() {
		return calories;
	}


	public void setCalories(BigDecimal calories) {
		this.calories = calories;
	}


	public BigDecimal getProtein() {
		return protein;
	}


	public void setProtein(BigDecimal protein) {
		this.protein = protein;
	}


	public BigDecimal getCarbohydrates() {
		return carbohydrates;
	}


	public void setCarbohydrates(BigDecimal carbohydrates) {
		this.carbohydrates = carbohydrates;
	}


	public BigDecimal getFat() {
		return fat;
	}


	public void setFat(BigDecimal fat) {
		this.fat = fat;
	}


	public BigDecimal getFiber() {
		return fiber;
	}


	public void setFiber(BigDecimal fiber) {
		this.fiber = fiber;
	}


	public int getAvailabilityStatus() {
		return availabilityStatus;
	}


	public void setAvailabilityStatus(int availabilityStatus) {
		this.availabilityStatus = availabilityStatus;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}

