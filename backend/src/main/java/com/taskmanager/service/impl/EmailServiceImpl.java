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

    public EmailServiceImpl(JavaMailSender mailSender,
                            @Value("${app.reset-password-url:http://localhost:3000/reset-password}") String resetUrlBase) {
        this.mailSender = mailSender;
        this.resetUrlBase = resetUrlBase;
    }

    @Override
    public void sendPasswordResetEmail(String to, String token) {
        String resetLink = String.format("%s/%s", resetUrlBase, token);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("Hello User,\n\n" +
                "Click the link below to reset your password:\n\n" +
                resetLink + "\n\n" +
                "This link expires in 15 minutes.\n\n" +
                "If you did not request this, please ignore this email.");
        mailSender.send(message);
    }
}
