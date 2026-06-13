# Full Stack Task Management System

A modern, full-stack task management application built with React.js, Spring Boot, and MySQL. The system allows users to create, manage, and track tasks with features like filtering, searching, pagination, and role-based access control.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### User Management
- ✅ User Registration with email validation
- ✅ User Login with JWT authentication
- ✅ Password encryption using BCrypt
- ✅ Role-based access control (USER, ADMIN)
- ✅ User profile page

### Task Management
- ✅ Create new tasks
- ✅ View all tasks (paginated)
- ✅ Update task details
- ✅ Delete tasks
- ✅ Search tasks by keyword
- ✅ Filter tasks by status
- ✅ Filter tasks by priority
- ✅ Sort tasks by multiple fields
- ✅ Pagination with customizable page size

### Task Properties
- ✅ Task Title (required)
- ✅ Task Description
- ✅ Priority: LOW, MEDIUM, HIGH
- ✅ Status: PENDING, IN_PROGRESS, COMPLETED
- ✅ Due Date
- ✅ Created At timestamp
- ✅ Updated At timestamp

### Dashboard
- ✅ Total tasks count
- ✅ Pending tasks count
- ✅ In Progress tasks count
- ✅ Completed tasks count
- ✅ Overdue tasks count

### Advanced Features
- ✅ JWT token-based authentication
- ✅ Global exception handling
- ✅ API response wrapper
- ✅ Request validation
- ✅ Pagination
- ✅ Sorting
- ✅ Swagger/OpenAPI documentation
- ✅ Responsive UI
- ✅ Error handling and user feedback

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           React.js Frontend (Port 3000)         │
│  - Login/Register Pages                         │
│  - Dashboard with Statistics                    │
│  - Task List with Filters                       │
│  - Task Create/Edit Forms                       │
│  - User Profile Page                            │
└──────────────┬──────────────────────────────────┘
               │
               ├─── REST API Calls
               │    (Axios with JWT)
               │
┌──────────────▼──────────────────────────────────┐
│      Spring Boot Backend (Port 8080)            │
│  ┌─────────────────────────────────────────┐   │
│  │ Controllers (REST Endpoints)            │   │
│  │ - AuthController                        │   │
│  │ - TaskController                        │   │
│  │ - DashboardController                   │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │ Services (Business Logic)               │   │
│  │ - AuthService                           │   │
│  │ - TaskService                           │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │ Security & JWT                          │   │
│  │ - JwtTokenProvider                      │   │
│  │ - SecurityConfig                        │   │
│  │ - JwtAuthenticationFilter               │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │ Repository Layer (JPA)                  │   │
│  │ - UserRepository                        │   │
│  │ - TaskRepository                        │   │
│  └─────────────────────────────────────────┘   │
└──────────────┬──────────────────────────────────┘
               │
               ├─── JDBC
               │
┌──────────────▼──────────────────────────────────┐
│          MySQL Database (Port 3306)             │
│  - users table                                  │
│  - tasks table                                  │
└─────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icons
- **Vite** - Modern build tool

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.3.0** - Web framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - ORM & Database access
- **Hibernate** - JPA implementation
- **JWT (JJWT)** - Token-based authentication
- **Maven** - Build tool
- **Lombok** - Boilerplate reduction
- **Swagger/Springdoc OpenAPI** - API documentation

### Database
- **MySQL 8.0+** - Relational database

### Tools & Libraries
- **Postman** - API testing
- **Git** - Version control
- **VSCode/IntelliJ IDEA** - IDE

## 📁 Project Structure

```
Task Management API/
├── backend/                          # Spring Boot Backend
│   ├── pom.xml                      # Maven configuration
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/taskmanager/
│   │   │   │   ├── TaskApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── TaskController.java
│   │   │   │   │   └── DashboardController.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── ApiResponse.java
│   │   │   │   │   ├── AuthRequest.java
│   │   │   │   │   ├── AuthResponse.java
│   │   │   │   │   ├── DashboardDto.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── TaskDto.java
│   │   │   │   │   └── UserDto.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Priority.java (Enum)
│   │   │   │   │   ├── Role.java (Enum)
│   │   │   │   │   ├── Status.java (Enum)
│   │   │   │   │   ├── Task.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── APIException.java
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   └── ResourceNotFoundException.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── TaskRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   └── JwtTokenProvider.java
│   │   │   │   └── service/
│   │   │   │       ├── AuthService.java (Interface)
│   │   │   │       ├── TaskService.java (Interface)
│   │   │   │       └── impl/
│   │   │   │           ├── AuthServiceImpl.java
│   │   │   │           └── TaskServiceImpl.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/taskmanager/
│   │           ├── controller/
│   │           ├── repository/
│   │           └── service/
│   └── target/                      # Build output
│
├── frontend/                        # React Frontend
│   ├── package.json                # NPM dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── jsconfig.json              # JavaScript config with path aliases
│   ├── index.html
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskTable.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── hooks/                  # Custom hooks (expandable)
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardPage.jsx
│   │   │   ├── error/
│   │   │   │   └── NotFoundPage.jsx
│   │   │   ├── profile/
│   │   │   │   └── ProfilePage.jsx
│   │   │   └── tasks/
│   │   │       ├── CreateTaskPage.jsx
│   │   │       ├── EditTaskPage.jsx
│   │   │       └── TaskListPage.jsx
│   │   ├── services/
│   │   │   ├── api.js             # API calls
│   │   │   └── apiClient.js       # Axios instance
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   └── helpers.js         # Helper functions
│   │   ├── App.jsx                # Main app
│   │   └── main.jsx               # Entry point
│   ├── .eslintrc.json            # ESLint config
│   ├── .gitignore
│   └── README.md
│
└── README.md                       # This file
```

## 📦 Installation & Setup

### Prerequisites
- Java 21 JDK
- Node.js 16+ with npm/yarn
- MySQL 8.0+
- Git

### Backend Setup

1. **Clone/Navigate to project**
   ```bash
   cd backend
   ```

2. **Install dependencies with Maven**
   ```bash
   mvn clean install
   ```

3. **Configure Database**
   - Create MySQL database: `CREATE DATABASE task_management_db;`
   - Update `src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db?useSSL=false&serverTimezone=UTC
     spring.datasource.username=root
     spring.datasource.password=your_password
     ```

4. **Run Backend**
   ```bash
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8080`

5. **Access Swagger Documentation**
   ```
   http://localhost:8080/swagger-ui.html
   ```

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:3000`

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/task-manager-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### Task Endpoints

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the full stack project",
  "priority": "HIGH",
  "status": "IN_PROGRESS",
  "dueDate": "2024-12-31"
}
```

#### Get All Tasks
```http
GET /api/tasks?page=0&size=10&sortBy=id&sortDir=desc
Authorization: Bearer {token}
```

#### Get Task by ID
```http
GET /api/tasks/1
Authorization: Bearer {token}
```

#### Update Task
```http
PUT /api/tasks/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "MEDIUM",
  "status": "COMPLETED",
  "dueDate": "2024-12-31"
}
```

#### Delete Task
```http
DELETE /api/tasks/1
Authorization: Bearer {token}
```

#### Filter Tasks by Status
```http
GET /api/tasks/status/PENDING?page=0&size=10
Authorization: Bearer {token}
```

#### Filter Tasks by Priority
```http
GET /api/tasks/priority/HIGH?page=0&size=10
Authorization: Bearer {token}
```

#### Search Tasks
```http
GET /api/tasks/search?keyword=project&page=0&size=10
Authorization: Bearer {token}
```

### Dashboard Endpoints

#### Get Dashboard Statistics
```http
GET /api/dashboard
Authorization: Bearer {token}
```

Response:
```json
{
  "success": true,
  "message": "Dashboard data fetched successfully",
  "data": {
    "totalTasks": 25,
    "pendingTasks": 10,
    "inProgressTasks": 8,
    "completedTasks": 7,
    "overdueTasks": 2
  }
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
  status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL,
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_priority (priority)
);
```

## 🔒 Authentication & Security

### JWT Configuration
- **Token Expiration**: 24 hours (86400000 milliseconds)
- **Algorithm**: HS512
- **Secret Key**: 512-bit hex key (configured in application.properties)

### Security Features
- ✅ BCrypt password hashing
- ✅ JWT token validation
- ✅ Request/Response validation
- ✅ CORS configuration
- ✅ Role-based access control
- ✅ Protected endpoints

### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
```

## 🌐 Deployment

### Backend Deployment (Heroku/AWS)
1. Create JAR file: `mvn clean package`
2. Deploy JAR to cloud platform
3. Configure environment variables (database URL, JWT secret)
4. Set up MySQL database on cloud

### Frontend Deployment (Vercel/Netlify)
1. Build frontend: `npm run build`
2. Deploy `dist` folder to Vercel/Netlify
3. Configure API URL in environment variables

## 🐛 Troubleshooting

### Backend Issues

#### Port 8080 already in use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

#### Database connection error
- Ensure MySQL is running
- Check credentials in application.properties
- Verify database exists

#### JWT Token errors
- Ensure token is included in Authorization header
- Check token expiration
- Verify JWT secret key matches

### Frontend Issues

#### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

#### API calls failing
- Check backend is running on port 8080
- Verify API URL in .env.local
- Check CORS configuration in backend

#### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

## 📝 Demo Credentials

For testing purposes:

```
Email: user@example.com
Password: password123

Or register a new account through the UI
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@taskmanager.com or open an issue in the repository.

---

**Created with ❤️ by the Development Team**
