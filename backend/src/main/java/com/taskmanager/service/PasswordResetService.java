package com.taskmanager.service;

import com.taskmanager.dto.PasswordResetRequest;
import com.taskmanager.dto.PasswordUpdateRequest;

public interface PasswordResetService {
    void requestPasswordReset(PasswordResetRequest request);
    void resetPassword(String token, PasswordUpdateRequest request);
}
