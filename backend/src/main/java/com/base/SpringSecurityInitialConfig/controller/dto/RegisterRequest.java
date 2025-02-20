package com.base.SpringSecurityInitialConfig.controller.dto;

import com.base.SpringSecurityInitialConfig.models.Role;
import com.base.SpringSecurityInitialConfig.models.RoleEntity;
import com.base.SpringSecurityInitialConfig.models.UserEntity;

import java.util.HashSet;
import java.util.Set;

public record RegisterRequest(String username, String email, String password) {
    public static UserEntity toModel(RegisterRequest request){
        RoleEntity roleUser = RoleEntity.builder()
                .nombre(Role.USER)
                .build();
        Set<RoleEntity> roles = new HashSet<>();
        roles.add(roleUser);
        return UserEntity.builder()
                        .username(request.username)
                        .password(request.password)
                        .email(request.email)
                        .roles(roles)
                        .build();
    }
}
