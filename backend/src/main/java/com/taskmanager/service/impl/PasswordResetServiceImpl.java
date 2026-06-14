package com.taskmanager.service.impl;

import com.taskmanager.dto.PasswordResetRequest;
import com.taskmanager.dto.PasswordUpdateRequest;
import com.taskmanager.entity.PasswordResetToken;
import com.taskmanager.entity.User;
import com.taskmanager.exception.APIException;
import com.taskmanager.repository.PasswordResetTokenRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.EmailService;
import com.taskmanager.service.PasswordResetService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository resetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public PasswordResetServiceImpl(UserRepository userRepository,
                                    PasswordResetTokenRepository resetTokenRepository,
                                    PasswordEncoder passwordEncoder,
                                    EmailService emailService) {
        this.userRepository = userRepository;
        this.resetTokenRepository = resetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public void requestPasswordReset(PasswordResetRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "Email not found"));

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusMinutes(15))
                .build();

        resetTokenRepository.save(resetToken);
        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    @Override
    public void resetPassword(String token, PasswordUpdateRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }

        PasswordResetToken resetToken = resetTokenRepository.findByToken(token)
                .orElseThrow(() -> new APIException(HttpStatus.BAD_REQUEST, "Invalid or expired reset token"));

        if (resetToken.isExpired()) {
            resetTokenRepository.delete(resetToken);
            throw new APIException(HttpStatus.BAD_REQUEST, "Reset token has expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        resetTokenRepository.delete(resetToken);
    }
}
