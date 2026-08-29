package com.healthycraftybites.userservice.repository;

import com.healthycraftybites.userservice.entity.CustomerFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CustomerFavoriteRepository extends JpaRepository<CustomerFavorite, Long> {
    List<CustomerFavorite> findByUsername(String username);
    Optional<CustomerFavorite> findByUsernameAndProductId(String username, Integer productId);
    void deleteByUsernameAndFavoriteId(String username, Long favoriteId);
}
