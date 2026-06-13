package com.taskmanager.controller;

import com.taskmanager.dto.ApiResponse;
import com.taskmanager.dto.DashboardDto;
import com.taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final TaskService taskService;

    public DashboardController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardDto>> getDashboardData(Principal principal) {
        DashboardDto dashboardData = taskService.getDashboardData(principal.getName());
        ApiResponse<DashboardDto> response = new ApiResponse<>(true, "Dashboard data fetched successfully", dashboardData);
        return ResponseEntity.ok(response);
    }
}
