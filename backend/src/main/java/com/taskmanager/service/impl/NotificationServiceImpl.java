package com.taskmanager.service.impl;

import com.taskmanager.dto.NotificationDto;
import com.taskmanager.entity.Notification;
import com.taskmanager.entity.NotificationType;
import com.taskmanager.entity.User;
import com.taskmanager.exception.APIException;
import com.taskmanager.repository.NotificationRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void publishNotification(Long userId, NotificationType type, String title, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "User not found"));

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .read(false)
                .build();

        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationDto> getRecentNotifications(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "User not found"));

        return notificationRepository.findTop7ByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> NotificationDto.builder()
                        .id(notification.getId())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .type(notification.getType())
                        .createdAt(notification.getCreatedAt())
                        .read(notification.isRead())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Long getUnreadCount(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "User not found"));
        return notificationRepository.countByUserAndReadFalse(user);
    }

    @Override
    public void markAllAsReadByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "User not found"));
        notificationRepository.markAllAsRead(user.getId());
    }
}


