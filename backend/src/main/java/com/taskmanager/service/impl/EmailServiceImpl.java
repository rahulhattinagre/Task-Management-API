package com.taskmanager.service.impl;

import com.taskmanager.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final String resetUrlBase;
    private final String mailFrom;

    public EmailServiceImpl(
            JavaMailSender mailSender,
            @Value("${app.reset-password-url:http://localhost:3000/reset-password}") String resetUrlBase,
            @Value("${spring.mail.username}") String mailFrom) {
        this.mailSender = mailSender;
        this.resetUrlBase = resetUrlBase;
        this.mailFrom = mailFrom;
    }

    @Override
    public void sendPasswordResetEmail(String to, String token) {
        String resetLink = String.format("%s/%s", resetUrlBase, token);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText(
                "Hello User,\n\n" +
                        "Click the link below to reset your password:\n\n" +
                        resetLink + "\n\n" +
                        "This link expires in 15 minutes.\n\n" +
                        "If you did not request this, please ignore this email."
        );

        try {
            mailSender.send(message);
            System.out.println("Password reset email sent successfully to: " + to);
        } catch (Exception e) {
            System.out.println("EMAIL ERROR while sending password reset email");
            System.out.println("From: " + mailFrom);
            System.out.println("To: " + to);
            System.out.println("ResetLink: " + resetLink);
            e.printStackTrace();
        }
    }

    @Override
    public void sendTaskDueSoonEmail(String email, String userName, String taskName, String dueDate, int daysBefore) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(email);
        message.setSubject("Task Due Soon");

        // Keep exact format requested
        message.setText(
                "Hello " + userName + ",\n\n" +
                        "This is a reminder that your task\n" +
                        "\"" + taskName + "\"\n" +
                        "is due on " + dueDate + ".\n\n" +
                        "Please complete it before the deadline.\n\n" +
                        "Regards,\n" +
                        "Task Manager Team"
        );

        try {
            mailSender.send(message);
            System.out.println("Task due reminder email sent successfully to: " + email + " (" + daysBefore + " days before)");
        } catch (Exception e) {
            System.out.println("EMAIL ERROR while sending task due reminder email");
            System.out.println("From: " + mailFrom);
            System.out.println("To: " + email);
            System.out.println("Task: " + taskName + ", dueDate: " + dueDate + ", daysBefore: " + daysBefore);
            e.printStackTrace();
        }
    }
}

