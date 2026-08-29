package com.healthycraftybites.userservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_favorite")
public class CustomerFavorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long favoriteId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private Double price;

    @Column(name = "img_name")
    private String imgName;

    @Column(name = "customised_details_json", columnDefinition = "TEXT")
    private String customisedDetailsJson;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public CustomerFavorite() {}

    public Long getFavoriteId() { return favoriteId; }
    public void setFavoriteId(Long favoriteId) { this.favoriteId = favoriteId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImgName() { return imgName; }
    public void setImgName(String imgName) { this.imgName = imgName; }

    public String getCustomisedDetailsJson() { return customisedDetailsJson; }
    public void setCustomisedDetailsJson(String customisedDetailsJson) { this.customisedDetailsJson = customisedDetailsJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
