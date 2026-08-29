package com.healthycraftybites.userservice.controller;

import com.healthycraftybites.userservice.dto.ApiResponse;
import com.healthycraftybites.userservice.entity.CustomerFavorite;
import com.healthycraftybites.userservice.entity.ProductReview;
import com.healthycraftybites.userservice.entity.UserProfile;
import com.healthycraftybites.userservice.repository.CustomerFavoriteRepository;
import com.healthycraftybites.userservice.repository.ProductReviewRepository;
import com.healthycraftybites.userservice.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userservice")
public class UserController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private CustomerFavoriteRepository favoriteRepository;

    @Autowired
    private ProductReviewRepository reviewRepository;

    @GetMapping("/profile/{username}")
    public ResponseEntity<ApiResponse<UserProfile>> getProfile(@PathVariable String username) {
        UserProfile profile = userProfileRepository.findByUsername(username)
                .orElseGet(() -> {
                    UserProfile newProfile = new UserProfile();
                    newProfile.setUsername(username);
                    newProfile.setFullName(username);
                    return userProfileRepository.save(newProfile);
                });
        return ResponseEntity.ok(ApiResponse.success("Profile fetched successfully", profile));
    }

    @PutMapping("/profile/{username}")
    public ResponseEntity<ApiResponse<UserProfile>> updateProfile(@PathVariable String username, @RequestBody UserProfile updated) {
        UserProfile profile = userProfileRepository.findByUsername(username)
                .orElseGet(() -> {
                    UserProfile p = new UserProfile();
                    p.setUsername(username);
                    return p;
                });
        if (updated.getFullName() != null) profile.setFullName(updated.getFullName());
        if (updated.getEmail() != null) profile.setEmail(updated.getEmail());
        if (updated.getPhone() != null) profile.setPhone(updated.getPhone());
        if (updated.getAddress() != null) profile.setAddress(updated.getAddress());
        
        UserProfile saved = userProfileRepository.save(profile);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", saved));
    }

    @PostMapping("/favorites/add")
    public ResponseEntity<ApiResponse<CustomerFavorite>> addFavorite(@RequestBody CustomerFavorite favorite) {
        CustomerFavorite saved = favoriteRepository.save(favorite);
        return ResponseEntity.ok(ApiResponse.success("Added to favorites", saved));
    }

    @GetMapping("/favorites/{username}")
    public ResponseEntity<ApiResponse<List<CustomerFavorite>>> getFavorites(@PathVariable String username) {
        List<CustomerFavorite> favorites = favoriteRepository.findByUsername(username);
        return ResponseEntity.ok(ApiResponse.success("Favorites fetched", favorites));
    }

    @DeleteMapping("/favorites/{username}/{favoriteId}")
    @Transactional
    public ResponseEntity<ApiResponse<String>> removeFavorite(@PathVariable String username, @PathVariable Long favoriteId) {
        favoriteRepository.deleteByUsernameAndFavoriteId(username, favoriteId);
        return ResponseEntity.ok(ApiResponse.success("Favorite removed", "Removed favorite with ID: " + favoriteId));
    }

    @PostMapping("/reviews/add")
    public ResponseEntity<ApiResponse<ProductReview>> addReview(@RequestBody ProductReview review) {
        ProductReview saved = reviewRepository.save(review);
        return ResponseEntity.ok(ApiResponse.success("Review submitted successfully", saved));
    }

    @GetMapping("/reviews/product/{productId}")
    public ResponseEntity<ApiResponse<List<ProductReview>>> getProductReviews(@PathVariable Integer productId) {
        List<ProductReview> reviews = reviewRepository.findByProductId(productId);
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched", reviews));
    }

    @GetMapping("/reviews/all")
    public ResponseEntity<ApiResponse<List<ProductReview>>> getAllReviews() {
        List<ProductReview> reviews = reviewRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("All reviews fetched", reviews));
    }
}
