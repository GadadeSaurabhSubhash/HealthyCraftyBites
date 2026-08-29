package com.healthycraftybites.paymentbillingservice.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_transaction")
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "transaction_number", unique = true, nullable = false)
    private String transactionNumber;

    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "payment_method")
    private String paymentMethod; // CARD, UPI, CASH_ON_COUNTER

    @Column(name = "status")
    private String status; // SUCCESS, PENDING, FAILED

    @Column(name = "payment_time", insertable = false, updatable = false)
    private LocalDateTime paymentTime;

    public PaymentTransaction() {}

    public Long getPaymentId() { return paymentId; }
    public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }

    public String getTransactionNumber() { return transactionNumber; }
    public void setTransactionNumber(String transactionNumber) { this.transactionNumber = transactionNumber; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getPaymentTime() { return paymentTime; }
    public void setPaymentTime(LocalDateTime paymentTime) { this.paymentTime = paymentTime; }
}
