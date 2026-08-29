package com.healthycraftybites.paymentbillingservice.controller;

import com.healthycraftybites.paymentbillingservice.dto.ApiResponse;
import com.healthycraftybites.paymentbillingservice.entity.PaymentTransaction;
import com.healthycraftybites.paymentbillingservice.repository.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/paymentbillingservice")
public class PaymentController {

    @Autowired
    private PaymentTransactionRepository paymentRepository;

    @PostMapping("/payment/process")
    public ResponseEntity<ApiResponse<PaymentTransaction>> processPayment(@RequestBody PaymentTransaction req) {
        String txnNum = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        req.setTransactionNumber(txnNum);
        req.setStatus("SUCCESS");
        
        PaymentTransaction saved = paymentRepository.save(req);
        return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", saved));
    }

    @GetMapping("/payment/bill/{orderNumber}")
    public ResponseEntity<ApiResponse<PaymentTransaction>> getBill(@PathVariable String orderNumber) {
        return paymentRepository.findByOrderNumber(orderNumber)
                .map(txn -> ResponseEntity.ok(ApiResponse.success("Bill transaction details fetched", txn)))
                .orElse(ResponseEntity.ok(ApiResponse.failure("No payment record found for order " + orderNumber)));
    }

    @PostMapping("/payment/mark-paid/{orderNumber}")
    public ResponseEntity<ApiResponse<PaymentTransaction>> markPaid(@PathVariable String orderNumber, @RequestParam(defaultValue = "CASH_ON_COUNTER") String method) {
        PaymentTransaction txn = paymentRepository.findByOrderNumber(orderNumber)
                .orElseGet(() -> {
                    PaymentTransaction t = new PaymentTransaction();
                    t.setOrderNumber(orderNumber);
                    t.setUsername("Customer");
                    return t;
                });
        txn.setTransactionNumber("TXN-CASH-" + System.currentTimeMillis());
        txn.setPaymentMethod(method);
        txn.setStatus("SUCCESS");
        PaymentTransaction saved = paymentRepository.save(txn);
        return ResponseEntity.ok(ApiResponse.success("Order marked as PAID at Cash Counter", saved));
    }
}
