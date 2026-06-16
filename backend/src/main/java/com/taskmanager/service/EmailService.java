package com.taskmanager.service;

public interface EmailService {
    void sendPasswordResetEmail(String email, String token);

    void sendTaskDueSoonEmail(String email, String userName, String taskName, String dueDate, int daysBefore);
}


