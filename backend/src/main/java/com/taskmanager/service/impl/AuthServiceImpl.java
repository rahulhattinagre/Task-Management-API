package com.taskmanager.service.impl;

import com.taskmanager.dto.AuthRequest;
import com.taskmanager.dto.AuthResponse;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDto;
import com.taskmanager.entity.NotificationType;
import com.taskmanager.entity.Role;
import com.taskmanager.entity.User;
import com.taskmanager.exception.APIException;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.JwtTokenProvider;
import com.taskmanager.service.AuthService;
import com.taskmanager.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final NotificationService notificationService;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider,
                           NotificationService notificationService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.notificationService = notificationService;
    }

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new APIException(HttpStatus.UNAUTHORIZED, "User not found"));

        notificationService.publishNotification(user.getId(), NotificationType.LOGIN, "Login time", "Signed in successfully.");

        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Override
    public UserDto register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Email is already registered");
        }

        Role userRole = registerRequest.getRole() != null ? registerRequest.getRole() : Role.USER;

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(userRole)
                .build();

        User savedUser = userRepository.save(user);

        return UserDto.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }
}

