package com.healthycraftybites.orderservice.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "customised_product")
public class CustomisedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customised_product_id")
    private Long customisedProductId;

    @Column(name = "meal_type", nullable = false)
    private String mealType; // SALAD, SANDWICH, ROLL

    @Column(name = "bread_id")
    private Integer breadId; // Null for Salad/Roll

    @Column(name = "roll_roti_id")
    private Integer rollRotiId; // Null for Salad/Sandwich

    @Column(name = "vegetable_ids_json", columnDefinition = "TEXT")
    private String vegetableIdsJson; // up to 6 items

    @Column(name = "bean_ids_json", columnDefinition = "TEXT")
    private String beanIdsJson; // up to 2 items

    @Column(name = "protein_portion_id")
    private Integer proteinPortionId; // up to 1 item

    @Column(name = "sauce_ids_json", columnDefinition = "TEXT")
    private String sauceIdsJson; // up to 4 items

    @Column(name = "seasoning_ids_json", columnDefinition = "TEXT")
    private String seasoningIdsJson; // up to 2 items

    @Column(name = "total_calories")
    private BigDecimal totalCalories;

    @Column(name = "total_protein")
    private BigDecimal totalProtein;

    @Column(name = "total_carbohydrates")
    private BigDecimal totalCarbohydrates;

    @Column(name = "total_fat")
    private BigDecimal totalFat;

    @Column(name = "total_fiber")
    private BigDecimal totalFiber;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    public CustomisedProduct() {}

    public Long getCustomisedProductId() { return customisedProductId; }
    public void setCustomisedProductId(Long customisedProductId) { this.customisedProductId = customisedProductId; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public Integer getBreadId() { return breadId; }
    public void setBreadId(Integer breadId) { this.breadId = breadId; }

    public Integer getRollRotiId() { return rollRotiId; }
    public void setRollRotiId(Integer rollRotiId) { this.rollRotiId = rollRotiId; }

    public String getVegetableIdsJson() { return vegetableIdsJson; }
    public void setVegetableIdsJson(String vegetableIdsJson) { this.vegetableIdsJson = vegetableIdsJson; }

    public String getBeanIdsJson() { return beanIdsJson; }
    public void setBeanIdsJson(String beanIdsJson) { this.beanIdsJson = beanIdsJson; }

    public Integer getProteinPortionId() { return proteinPortionId; }
    public void setProteinPortionId(Integer proteinPortionId) { this.proteinPortionId = proteinPortionId; }

    public String getSauceIdsJson() { return sauceIdsJson; }
    public void setSauceIdsJson(String sauceIdsJson) { this.sauceIdsJson = sauceIdsJson; }

    public String getSeasoningIdsJson() { return seasoningIdsJson; }
    public void setSeasoningIdsJson(String seasoningIdsJson) { this.seasoningIdsJson = seasoningIdsJson; }

    public BigDecimal getTotalCalories() { return totalCalories; }
    public void setTotalCalories(BigDecimal totalCalories) { this.totalCalories = totalCalories; }

    public BigDecimal getTotalProtein() { return totalProtein; }
    public void setTotalProtein(BigDecimal totalProtein) { this.totalProtein = totalProtein; }

    public BigDecimal getTotalCarbohydrates() { return totalCarbohydrates; }
    public void setTotalCarbohydrates(BigDecimal totalCarbohydrates) { this.totalCarbohydrates = totalCarbohydrates; }

    public BigDecimal getTotalFat() { return totalFat; }
    public void setTotalFat(BigDecimal totalFat) { this.totalFat = totalFat; }

    public BigDecimal getTotalFiber() { return totalFiber; }
    public void setTotalFiber(BigDecimal totalFiber) { this.totalFiber = totalFiber; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}
