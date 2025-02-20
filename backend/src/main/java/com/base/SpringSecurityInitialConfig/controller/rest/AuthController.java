package com.base.SpringSecurityInitialConfig.controller.rest;

import com.base.SpringSecurityInitialConfig.controller.dto.AuthResponse;
import com.base.SpringSecurityInitialConfig.controller.dto.LoginRequest;
import com.base.SpringSecurityInitialConfig.controller.dto.RegisterRequest;
import com.base.SpringSecurityInitialConfig.models.UserEntity;
import com.base.SpringSecurityInitialConfig.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        UserEntity user = LoginRequest.toModel(loginRequest);
        return ResponseEntity.ok(authService.login(user));
    }
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest){
        UserEntity user = RegisterRequest.toModel(registerRequest);
        return ResponseEntity.ok(authService.register(user));
    }

}