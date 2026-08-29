package com.healthycraftybites.userservice.repository;

import com.healthycraftybites.userservice.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductId(Integer productId);
    List<ProductReview> findByUsername(String username);
}
