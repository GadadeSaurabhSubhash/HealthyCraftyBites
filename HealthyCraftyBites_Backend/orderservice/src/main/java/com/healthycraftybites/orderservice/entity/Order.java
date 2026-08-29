package com.healthycraftybites.orderservice.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "payment_status")
    private String paymentStatus; // PENDING_PAYMENT, PAID

    @Column(name = "order_status")
    private String orderStatus; // RECEIVED, PREPARING, READY, COMPLETED, CANCELLED

    @Column(name = "advance_pickup_date")
    private String advancePickupDate;

    @Column(name = "advance_pickup_time")
    private String advancePickupTime;

    @Column(name = "special_instructions")
    private String specialInstructions;

    @Column(name = "order_date", insertable = false, updatable = false)
    private LocalDateTime orderDate;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

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

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getAdvancePickupDate() { return advancePickupDate; }
    public void setAdvancePickupDate(String advancePickupDate) { this.advancePickupDate = advancePickupDate; }

    public String getAdvancePickupTime() { return advancePickupTime; }
    public void setAdvancePickupTime(String advancePickupTime) { this.advancePickupTime = advancePickupTime; }

    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
