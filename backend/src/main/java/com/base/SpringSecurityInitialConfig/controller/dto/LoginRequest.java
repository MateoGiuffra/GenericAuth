package com.base.SpringSecurityInitialConfig.controller.dto;

import com.base.SpringSecurityInitialConfig.models.UserEntity;

public record LoginRequest(String username, String password) {

    public static UserEntity toModel(LoginRequest loginRequest) {
        return UserEntity.builder()
                .username(loginRequest.username())
                .password(loginRequest.password())
                .build();
    }
}
