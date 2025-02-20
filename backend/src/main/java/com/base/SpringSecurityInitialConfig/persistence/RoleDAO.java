package com.base.SpringSecurityInitialConfig.persistence;

import com.base.SpringSecurityInitialConfig.models.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends JpaRepository<RoleEntity, Long> {
}
