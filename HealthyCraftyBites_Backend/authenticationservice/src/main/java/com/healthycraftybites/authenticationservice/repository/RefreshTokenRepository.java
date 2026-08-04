package com.healthycraftybites.authenticationservice.repository;

import com.healthycraftybites.authenticationservice.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String refreshTokenStr);
    void deleteByUsername(String username);
    void deleteByToken(String refreshTokenStr);
}