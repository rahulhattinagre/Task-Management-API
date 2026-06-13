package com.taskmanager.service;

import com.taskmanager.dto.AuthRequest;
import com.taskmanager.dto.AuthResponse;
import com.taskmanager.dto.RegisterRequest;
import com.taskmanager.dto.UserDto;

public interface AuthService {
    AuthResponse login(AuthRequest authRequest);
    UserDto register(RegisterRequest registerRequest);
}
