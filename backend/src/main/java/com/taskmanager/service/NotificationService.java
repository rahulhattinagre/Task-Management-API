package com.taskmanager.service;

import com.taskmanager.dto.NotificationDto;
import com.taskmanager.entity.NotificationType;

import java.util.List;

public interface NotificationService {
    void publishNotification(Long userId, NotificationType type, String title, String message);
    List<NotificationDto> getRecentNotifications(String email);
    Long getUnreadCount(String email);
    void markAllAsReadByEmail(String email);
}



