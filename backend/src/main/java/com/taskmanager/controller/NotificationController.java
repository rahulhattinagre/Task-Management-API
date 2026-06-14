package com.taskmanager.controller;

import com.taskmanager.dto.ApiResponse;
import com.taskmanager.dto.NotificationDto;
import com.taskmanager.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getRecentNotifications(Principal principal) {
        List<NotificationDto> notifications = notificationService.getRecentNotifications(principal.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Notifications fetched successfully", notifications));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount(Principal principal) {
        Long count = notificationService.getUnreadCount(principal.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Unread count fetched successfully", count));
    }
}
