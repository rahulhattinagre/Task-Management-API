package com.taskmanager.repository;

import com.taskmanager.entity.Notification;
import com.taskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findTop7ByUserOrderByCreatedAtDesc(User user);
    Long countByUserAndReadFalse(User user);

    @Modifying
    @Query("UPDATE Notification n SET n.read=true WHERE n.user.id=:userId")
    void markAllAsRead(@Param("userId") Long userId);
}

