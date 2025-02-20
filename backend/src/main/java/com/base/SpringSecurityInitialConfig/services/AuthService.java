package com.base.SpringSecurityInitialConfig.services;

import com.base.SpringSecurityInitialConfig.controller.dto.AuthResponse;
import com.base.SpringSecurityInitialConfig.models.UserEntity;
import com.base.SpringSecurityInitialConfig.persistence.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDAO userDao;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(UserEntity user) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        UserDetails userSaved = userDao.findByUsername(user.getUsername()).orElseThrow();
        return jwtService.getNewToken(userSaved);
    }

    public AuthResponse register(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity userSaved = userDao.save(user);
        return jwtService.getNewToken(userSaved);
    }
}
