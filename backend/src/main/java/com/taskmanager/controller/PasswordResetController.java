package com.taskmanager.controller;

import com.taskmanager.dto.ApiResponse;
import com.taskmanager.dto.PasswordResetRequest;
import com.taskmanager.dto.PasswordUpdateRequest;
import com.taskmanager.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        passwordResetService.requestPasswordReset(request);
        ApiResponse<String> response = new ApiResponse<>(true, "Password reset email sent successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @PathVariable("token") String token,
            @Valid @RequestBody PasswordUpdateRequest request) {
        passwordResetService.resetPassword(token, request);
        ApiResponse<String> response = new ApiResponse<>(true, "Password updated successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
