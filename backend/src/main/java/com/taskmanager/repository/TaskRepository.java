package com.taskmanager.repository;

import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Status;
import com.taskmanager.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByUserId(Long userId, Pageable pageable);

    Page<Task> findByUserIdAndStatus(Long userId, Status status, Pageable pageable);

    Page<Task> findByUserIdAndPriority(Long userId, Priority priority, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.user.id = :userId AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Task> searchTasks(@Param("userId") Long userId, @Param("keyword") String keyword, Pageable pageable);

    Long countByUserId(Long userId);

    Long countByUserIdAndStatus(Long userId, Status status);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = :userId AND t.status != :status AND t.dueDate < :date")
    Long countOverdueTasks(@Param("userId") Long userId, @Param("status") Status status, @Param("date") LocalDate date);
}
