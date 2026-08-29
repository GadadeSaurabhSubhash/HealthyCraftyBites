package com.healthycraftybites.paymentbillingservice.repository;

import com.healthycraftybites.paymentbillingservice.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    Optional<PaymentTransaction> findByOrderNumber(String orderNumber);
}
