package com.taskmanager.service.impl;

import com.taskmanager.dto.DashboardDto;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.entity.NotificationType;
import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Role;
import com.taskmanager.entity.Status;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.exception.APIException;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.NotificationService;
import com.taskmanager.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, NotificationService notificationService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Override
    public TaskDto createTask(TaskDto taskDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Task task = mapToEntity(taskDto, user);
        Task savedTask = taskRepository.save(task);
        notificationService.publishNotification(user.getId(), NotificationType.CREATED, "Task created", "Created \"" + savedTask.getTitle() + "\".");
        return mapToDto(savedTask);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));

        // Ownership check: must be owner or ADMIN
        if (!task.getUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new APIException(HttpStatus.FORBIDDEN, "You do not have permission to update this task");
        }

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriority(taskDto.getPriority());
        task.setStatus(taskDto.getStatus());
        task.setDueDate(taskDto.getDueDate());

        Task updatedTask = taskRepository.save(task);
        notificationService.publishNotification(user.getId(), NotificationType.UPDATED, "Task updated", "Updated \"" + updatedTask.getTitle() + "\".");
        return mapToDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));

        // Ownership check: must be owner or ADMIN
        if (!task.getUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new APIException(HttpStatus.FORBIDDEN, "You do not have permission to delete this task");
        }

        notificationService.publishNotification(user.getId(), NotificationType.DELETED, "Task deleted", "Deleted \"" + task.getTitle() + "\".");
        taskRepository.delete(task);
    }

    @Override
    public TaskDto getTaskById(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));

        // Ownership check: must be owner or ADMIN
        if (!task.getUser().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new APIException(HttpStatus.FORBIDDEN, "You do not have permission to access this task");
        }

        return mapToDto(task);
    }

    @Override
    public Page<TaskDto> getAllTasks(String email, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Page<Task> tasks;
        // ADMIN can see all tasks, standard users see only their own
        if (user.getRole() == Role.ADMIN) {
            tasks = taskRepository.findAll(pageable);
        } else {
            tasks = taskRepository.findByUserId(user.getId(), pageable);
        }

        return tasks.map(this::mapToDto);
    }

    @Override
    public Page<TaskDto> getTasksByStatus(String email, Status status, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Page<Task> tasks = taskRepository.findByUserIdAndStatus(user.getId(), status, pageable);
        return tasks.map(this::mapToDto);
    }

    @Override
    public Page<TaskDto> getTasksByPriority(String email, Priority priority, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Page<Task> tasks = taskRepository.findByUserIdAndPriority(user.getId(), priority, pageable);
        return tasks.map(this::mapToDto);
    }

    @Override
    public Page<TaskDto> searchTasks(String email, String keyword, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Page<Task> tasks = taskRepository.searchTasks(user.getId(), keyword, pageable);
        return tasks.map(this::mapToDto);
    }

    @Override
    public DashboardDto getDashboardData(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Long userId = user.getId();
        Long totalTasks = taskRepository.countByUserId(userId);
        Long pendingTasks = taskRepository.countByUserIdAndStatus(userId, Status.PENDING);
        Long inProgressTasks = taskRepository.countByUserIdAndStatus(userId, Status.IN_PROGRESS);
        Long completedTasks = taskRepository.countByUserIdAndStatus(userId, Status.COMPLETED);
        Long overdueTasks = taskRepository.countOverdueTasks(userId, Status.COMPLETED, LocalDate.now());

        return DashboardDto.builder()
                .totalTasks(totalTasks)
                .pendingTasks(pendingTasks)
                .inProgressTasks(inProgressTasks)
                .completedTasks(completedTasks)
                .overdueTasks(overdueTasks)
                .build();
    }

    private TaskDto mapToDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .userId(task.getUser().getId())
                .build();
    }

    private Task mapToEntity(TaskDto dto, User user) {
        return Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .priority(dto.getPriority())
                .status(dto.getStatus())
                .dueDate(dto.getDueDate())
                .user(user)
                .build();
    }
}
