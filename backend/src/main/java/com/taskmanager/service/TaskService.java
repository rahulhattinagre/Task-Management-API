package com.taskmanager.service;

import com.taskmanager.dto.DashboardDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto, String email);
    
    TaskDto updateTask(Long id, TaskDto taskDto, String email);
    
    void deleteTask(Long id, String email);
    
    TaskDto getTaskById(Long id, String email);
    
    Page<TaskDto> getAllTasks(String email, Pageable pageable);
    
    Page<TaskDto> getTasksByStatus(String email, Status status, Pageable pageable);
    
    Page<TaskDto> getTasksByPriority(String email, Priority priority, Pageable pageable);
    
    Page<TaskDto> searchTasks(String email, String keyword, Pageable pageable);
    
    DashboardDto getDashboardData(String email);
}
