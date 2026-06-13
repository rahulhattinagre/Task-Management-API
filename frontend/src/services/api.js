import apiClient from './apiClient';

export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};

export const taskService = {
  createTask: (data) => apiClient.post('/tasks', data),
  getTasks: (page = 0, size = 10, sortBy = 'id', sortDir = 'desc') =>
    apiClient.get(`/tasks?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  getTaskById: (id) => apiClient.get(`/tasks/${id}`),
  updateTask: (id, data) => apiClient.put(`/tasks/${id}`, data),
  deleteTask: (id) => apiClient.delete(`/tasks/${id}`),
  getTasksByStatus: (status, page = 0, size = 10, sortBy = 'id', sortDir = 'desc') =>
    apiClient.get(`/tasks/status/${status}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  getTasksByPriority: (priority, page = 0, size = 10, sortBy = 'id', sortDir = 'desc') =>
    apiClient.get(`/tasks/priority/${priority}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  searchTasks: (keyword, page = 0, size = 10, sortBy = 'id', sortDir = 'desc') =>
    apiClient.get(`/tasks/search?keyword=${keyword}&page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  getDashboard: () => apiClient.get('/dashboard'),
};
