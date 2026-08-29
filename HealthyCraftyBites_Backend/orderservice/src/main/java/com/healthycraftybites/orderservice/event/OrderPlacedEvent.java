package com.healthycraftybites.orderservice.event;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderPlacedEvent implements Serializable {
    private Long orderId;
    private String orderNumber;
    private String username;
    private String customerEmail;
    private BigDecimal totalAmount;
    private Integer totalCalories;
    private BigDecimal totalProtein;
    private BigDecimal totalCarbs;
    private BigDecimal totalFat;
    private BigDecimal totalFiber;
    private String orderType;
    private String advancePickupTime;
    private LocalDateTime orderDate;

    public OrderPlacedEvent() {}

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public Integer getTotalCalories() { return totalCalories; }
    public void setTotalCalories(Integer totalCalories) { this.totalCalories = totalCalories; }

    public BigDecimal getTotalProtein() { return totalProtein; }
    public void setTotalProtein(BigDecimal totalProtein) { this.totalProtein = totalProtein; }

    public BigDecimal getTotalCarbs() { return totalCarbs; }
    public void setTotalCarbs(BigDecimal totalCarbs) { this.totalCarbs = totalCarbs; }

    public BigDecimal getTotalFat() { return totalFat; }
    public void setTotalFat(BigDecimal totalFat) { this.totalFat = totalFat; }

    public BigDecimal getTotalFiber() { return totalFiber; }
    public void setTotalFiber(BigDecimal totalFiber) { this.totalFiber = totalFiber; }

    public String getOrderType() { return orderType; }
    public void setOrderType(String orderType) { this.orderType = orderType; }

    public String getAdvancePickupTime() { return advancePickupTime; }
    public void setAdvancePickupTime(String advancePickupTime) { this.advancePickupTime = advancePickupTime; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
}
