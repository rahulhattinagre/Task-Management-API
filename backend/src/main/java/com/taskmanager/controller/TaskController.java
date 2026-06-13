package com.taskmanager.controller;

import com.taskmanager.dto.ApiResponse;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.entity.Priority;
import com.taskmanager.entity.Status;
import com.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TaskDto>> createTask(@Valid @RequestBody TaskDto taskDto, Principal principal) {
        TaskDto createdTask = taskService.createTask(taskDto, principal.getName());
        ApiResponse<TaskDto> response = new ApiResponse<>(true, "Task created successfully", createdTask);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<TaskDto>>> getAllTasks(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc", required = false) String sortDir,
            Principal principal) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));
        Page<TaskDto> tasks = taskService.getAllTasks(principal.getName(), pageable);
        ApiResponse<Page<TaskDto>> response = new ApiResponse<>(true, "Tasks fetched successfully", tasks);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskDto>> getTaskById(@PathVariable("id") Long id, Principal principal) {
        TaskDto taskDto = taskService.getTaskById(id, principal.getName());
        ApiResponse<TaskDto> response = new ApiResponse<>(true, "Task fetched successfully", taskDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TaskDto>> updateTask(
            @PathVariable("id") Long id,
            @Valid @RequestBody TaskDto taskDto,
            Principal principal) {
        
        TaskDto updatedTask = taskService.updateTask(id, taskDto, principal.getName());
        ApiResponse<TaskDto> response = new ApiResponse<>(true, "Task updated successfully", updatedTask);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTask(@PathVariable("id") Long id, Principal principal) {
        taskService.deleteTask(id, principal.getName());
        ApiResponse<String> response = new ApiResponse<>(true, "Task deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<Page<TaskDto>>> getTasksByStatus(
            @PathVariable("status") Status status,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc", required = false) String sortDir,
            Principal principal) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));
        Page<TaskDto> tasks = taskService.getTasksByStatus(principal.getName(), status, pageable);
        ApiResponse<Page<TaskDto>> response = new ApiResponse<>(true, "Tasks fetched by status successfully", tasks);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<ApiResponse<Page<TaskDto>>> getTasksByPriority(
            @PathVariable("priority") Priority priority,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc", required = false) String sortDir,
            Principal principal) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));
        Page<TaskDto> tasks = taskService.getTasksByPriority(principal.getName(), priority, pageable);
        ApiResponse<Page<TaskDto>> response = new ApiResponse<>(true, "Tasks fetched by priority successfully", tasks);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<TaskDto>>> searchTasks(
            @RequestParam("keyword") String keyword,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc", required = false) String sortDir,
            Principal principal) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));
        Page<TaskDto> tasks = taskService.searchTasks(principal.getName(), keyword, pageable);
        ApiResponse<Page<TaskDto>> response = new ApiResponse<>(true, "Tasks searched successfully", tasks);
        return ResponseEntity.ok(response);
    }
}
