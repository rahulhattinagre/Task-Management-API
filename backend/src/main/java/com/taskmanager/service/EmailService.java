package com.taskmanager.service;

public interface EmailService {
    void sendPasswordResetEmail(String email, String token);
}

