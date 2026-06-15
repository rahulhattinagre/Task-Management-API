package com.taskmanager.service;

import com.taskmanager.dto.TaskDto;
import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Role;
import com.taskmanager.entity.Status;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private TaskServiceImpl taskService;

    private User user;
    private Task task;
    private TaskDto taskDto;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .name("John Doe")
                .email("john@example.com")
                .password("password")
                .role(Role.USER)
                .build();

        task = Task.builder()
                .id(10L)
                .title("Service Task")
                .description("Service Description")
                .priority(Priority.MEDIUM)
                .status(Status.PENDING)
                .dueDate(LocalDate.now())
                .user(user)
                .build();

        taskDto = TaskDto.builder()
                .title("Service Task")
                .description("Service Description")
                .priority(Priority.MEDIUM)
                .status(Status.PENDING)
                .dueDate(LocalDate.now())
                .build();
    }

    @Test
    void testCreateTask() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskDto created = taskService.createTask(taskDto, "john@example.com");

        assertThat(created).isNotNull();
        assertThat(created.getId()).isEqualTo(10L);
        assertThat(created.getTitle()).isEqualTo("Service Task");
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testGetTaskById() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(taskRepository.findById(10L)).thenReturn(Optional.of(task));

        TaskDto found = taskService.getTaskById(10L, "john@example.com");

        assertThat(found).isNotNull();
        assertThat(found.getTitle()).isEqualTo("Service Task");
    }
}
