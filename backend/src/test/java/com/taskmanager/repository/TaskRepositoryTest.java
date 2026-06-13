package com.taskmanager.repository;

import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Role;
import com.taskmanager.entity.Status;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest(properties = {
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    private User savedUser;

    @BeforeEach
    void setUp() {
        User user = User.builder()
                .name("John Doe")
                .email("john@example.com")
                .password("password")
                .role(Role.USER)
                .build();
        savedUser = userRepository.save(user);
    }

    @Test
    void testSaveAndFindTask() {
        Task task = Task.builder()
                .title("Complete Report")
                .description("Write final report")
                .priority(Priority.HIGH)
                .status(Status.PENDING)
                .dueDate(LocalDate.now().plusDays(2))
                .user(savedUser)
                .build();

        Task savedTask = taskRepository.save(task);

        assertThat(savedTask.getId()).isNotNull();
        assertThat(savedTask.getTitle()).isEqualTo("Complete Report");

        Optional<Task> foundTask = taskRepository.findById(savedTask.getId());
        assertThat(foundTask.isPresent()).isTrue();
        assertThat(foundTask.get().getDescription()).isEqualTo("Write final report");
    }

    @Test
    void testFindByUserId() {
        Task task1 = Task.builder()
                .title("Task 1")
                .priority(Priority.LOW)
                .status(Status.IN_PROGRESS)
                .user(savedUser)
                .build();

        Task task2 = Task.builder()
                .title("Task 2")
                .priority(Priority.MEDIUM)
                .status(Status.COMPLETED)
                .user(savedUser)
                .build();

        taskRepository.save(task1);
        taskRepository.save(task2);

        Pageable pageable = PageRequest.of(0, 10);
        Page<Task> tasksPage = taskRepository.findByUserId(savedUser.getId(), pageable);

        assertThat(tasksPage.getContent()).hasSize(2);
        assertThat(tasksPage.getContent().get(0).getTitle()).isEqualTo("Task 1");
    }
}
