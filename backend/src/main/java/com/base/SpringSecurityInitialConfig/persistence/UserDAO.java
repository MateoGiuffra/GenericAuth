package com.base.SpringSecurityInitialConfig.persistence;

import com.base.SpringSecurityInitialConfig.models.UserEntity;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(@NotBlank String username);
}
