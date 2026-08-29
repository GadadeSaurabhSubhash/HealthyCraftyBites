package com.healthycraftybites.orderservice.controller;

import com.healthycraftybites.orderservice.dto.ApiResponse;
import com.healthycraftybites.orderservice.entity.Order;
import com.healthycraftybites.orderservice.entity.OrderItem;
import com.healthycraftybites.orderservice.event.OrderPlacedEvent;
import com.healthycraftybites.orderservice.repository.OrderRepository;
import com.healthycraftybites.orderservice.service.OrderKafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orderservice")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderKafkaProducer kafkaProducer;

    @PostMapping("/orders/place")
    public ResponseEntity<ApiResponse<Order>> placeOrder(@RequestBody Order order) {
        String orderNum = "HCB-" + System.currentTimeMillis();
        order.setOrderNumber(orderNum);
        if (order.getPaymentStatus() == null) {
            order.setPaymentStatus("PENDING_PAYMENT");
        }
        if (order.getOrderStatus() == null) {
            order.setOrderStatus("RECEIVED");
        }

        Order savedOrder = orderRepository.save(order);

        // Publish OrderPlacedEvent to Kafka
        OrderPlacedEvent event = new OrderPlacedEvent();
        event.setOrderId(savedOrder.getOrderId());
        event.setOrderNumber(savedOrder.getOrderNumber());
        event.setUsername(savedOrder.getUsername());
        event.setCustomerEmail(savedOrder.getCustomerEmail());
        event.setTotalAmount(savedOrder.getTotalAmount());
        event.setAdvancePickupTime(savedOrder.getAdvancePickupTime());
        event.setOrderDate(LocalDateTime.now());

        // Aggregate total macros from custom items for Kafka notification/analytics
        int calories = 0;
        BigDecimal protein = BigDecimal.ZERO;
        BigDecimal carbs = BigDecimal.ZERO;
        BigDecimal fat = BigDecimal.ZERO;
        BigDecimal fiber = BigDecimal.ZERO;

        if (savedOrder.getItems() != null) {
            for (OrderItem item : savedOrder.getItems()) {
                if (item.getCustomisedProduct() != null) {
                    if (item.getCustomisedProduct().getTotalCalories() != null)
                        calories += item.getCustomisedProduct().getTotalCalories().intValue();
                    if (item.getCustomisedProduct().getTotalProtein() != null)
                        protein = protein.add(item.getCustomisedProduct().getTotalProtein());
                    if (item.getCustomisedProduct().getTotalCarbohydrates() != null)
                        carbs = carbs.add(item.getCustomisedProduct().getTotalCarbohydrates());
                    if (item.getCustomisedProduct().getTotalFat() != null)
                        fat = fat.add(item.getCustomisedProduct().getTotalFat());
                    if (item.getCustomisedProduct().getTotalFiber() != null)
                        fiber = fiber.add(item.getCustomisedProduct().getTotalFiber());
                }
            }
        }
        event.setTotalCalories(calories);
        event.setTotalProtein(protein);
        event.setTotalCarbs(carbs);
        event.setTotalFat(fat);
        event.setTotalFiber(fiber);

        kafkaProducer.sendOrderPlacedEvent(event);

        return ResponseEntity.ok(ApiResponse.success("Order placed successfully", savedOrder));
    }

    @GetMapping("/orders/user/{username}")
    public ResponseEntity<ApiResponse<List<Order>>> getUserOrders(@PathVariable String username) {
        List<Order> orders = orderRepository.findByUsernameOrderByOrderIdDesc(username);
        return ResponseEntity.ok(ApiResponse.success("User orders fetched", orders));
    }

    @GetMapping("/orders/all")
    public ResponseEntity<ApiResponse<List<Order>>> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByOrderIdDesc();
        return ResponseEntity.ok(ApiResponse.success("All orders fetched", orders));
    }

    @GetMapping("/orders/detail/{orderNumber}")
    public ResponseEntity<ApiResponse<Order>> getOrderDetail(@PathVariable String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .map(order -> ResponseEntity.ok(ApiResponse.success("Order detail fetched", order)))
                .orElse(ResponseEntity.ok(ApiResponse.failure("Order not found")));
    }

    @PatchMapping("/orders/status/{orderId}")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(@PathVariable Long orderId, @RequestParam String newStatus) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setOrderStatus(newStatus);
                    Order saved = orderRepository.save(order);
                    return ResponseEntity.ok(ApiResponse.success("Order status updated", saved));
                })
                .orElse(ResponseEntity.ok(ApiResponse.failure("Order not found")));
    }

    @PatchMapping("/orders/payment-status/{orderId}")
    public ResponseEntity<ApiResponse<Order>> updatePaymentStatus(@PathVariable Long orderId, @RequestParam String paymentStatus) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setPaymentStatus(paymentStatus);
                    Order saved = orderRepository.save(order);
                    return ResponseEntity.ok(ApiResponse.success("Payment status updated to " + paymentStatus, saved));
                })
                .orElse(ResponseEntity.ok(ApiResponse.failure("Order not found")));
    }
}
