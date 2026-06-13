# Task Management Backend

Spring Boot 3.3.0 backend for the Full Stack Task Management System.

## Features

- ✅ User Authentication with JWT
- ✅ Role-Based Access Control (USER, ADMIN)
- ✅ Complete Task Management CRUD Operations
- ✅ Advanced Filtering (Status, Priority)
- ✅ Task Search Functionality
- ✅ Pagination & Sorting
- ✅ Dashboard with Statistics
- ✅ Global Exception Handling
- ✅ Comprehensive API Documentation (Swagger)
- ✅ Input Validation
- ✅ Transactional Operations

## Tech Stack

- **Java 21** - Programming language
- **Spring Boot 3.3.0** - Web framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - ORM & database operations
- **Hibernate** - JPA implementation
- **JWT (JJWT 0.11.5)** - Token-based authentication
- **MySQL 8.0+** - Database
- **Maven** - Build tool
- **Lombok** - Boilerplate reduction
- **Swagger/Springdoc OpenAPI** - API documentation

## Project Structure

```
backend/
├── pom.xml                              # Maven configuration & dependencies
├── src/
│   ├── main/
│   │   ├── java/com/taskmanager/
│   │   │   ├── TaskApplication.java     # Main Spring Boot application
│   │   │   │
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java  # Spring Security configuration
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java     # Authentication endpoints
│   │   │   │   ├── TaskController.java     # Task management endpoints
│   │   │   │   └── DashboardController.java # Dashboard endpoints
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── ApiResponse.java           # Wrapper for API responses
│   │   │   │   ├── AuthRequest.java           # Login request
│   │   │   │   ├── AuthResponse.java          # Login response with token
│   │   │   │   ├── DashboardDto.java          # Dashboard statistics
│   │   │   │   ├── RegisterRequest.java       # User registration
│   │   │   │   ├── TaskDto.java               # Task data transfer object
│   │   │   │   └── UserDto.java               # User data transfer object
│   │   │   │
│   │   │   ├── entity/
│   │   │   │   ├── Priority.java  (Enum: LOW, MEDIUM, HIGH)
│   │   │   │   ├── Role.java      (Enum: USER, ADMIN)
│   │   │   │   ├── Status.java    (Enum: PENDING, IN_PROGRESS, COMPLETED)
│   │   │   │   ├── Task.java      # Task entity with JPA mapping
│   │   │   │   └── User.java      # User entity with JPA mapping
│   │   │   │
│   │   │   ├── exception/
│   │   │   │   ├── APIException.java               # Custom API exception
│   │   │   │   ├── GlobalExceptionHandler.java    # Global error handler
│   │   │   │   └── ResourceNotFoundException.java # Resource not found
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── TaskRepository.java   # Task database queries
│   │   │   │   └── UserRepository.java   # User database queries
│   │   │   │
│   │   │   ├── security/
│   │   │   │   ├── CustomUserDetailsService.java    # User details provider
│   │   │   │   ├── JwtAuthenticationEntryPoint.java # JWT entry point
│   │   │   │   ├── JwtAuthenticationFilter.java     # JWT filter
│   │   │   │   └── JwtTokenProvider.java            # JWT token generation
│   │   │   │
│   │   │   └── service/
│   │   │       ├── AuthService.java           # Authentication interface
│   │   │       ├── TaskService.java           # Task operations interface
│   │   │       └── impl/
│   │   │           ├── AuthServiceImpl.java    # Authentication implementation
│   │   │           └── TaskServiceImpl.java    # Task operations implementation
│   │   │
│   │   └── resources/
│   │       └── application.properties    # Application configuration
│   │
│   └── test/                              # Unit tests
│       └── java/com/taskmanager/
│           ├── controller/
│           ├── repository/
│           └── service/
│
└── target/                                # Compiled classes & JAR file
```

## Installation & Setup

### Prerequisites
- Java 21 JDK installed
- Maven 3.8+ installed
- MySQL 8.0+ installed and running

### Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create MySQL Database**
   ```sql
   CREATE DATABASE task_management_db;
   ```

3. **Configure Database Connection**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   
   # JPA / Hibernate
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   
   # JWT Configuration
   app.jwt-secret=your_secure_secret_key_here
   app.jwt-expiration-milliseconds=86400000
   ```

4. **Install Dependencies**
   ```bash
   mvn clean install
   ```

## Running the Application

### Development Mode
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Building for Production
```bash
mvn clean package
```

JAR file will be created at `target/task-manager-0.0.1-SNAPSHOT.jar`

### Running JAR File
```bash
java -jar target/task-manager-0.0.1-SNAPSHOT.jar
```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login

### Tasks

- **GET** `/api/tasks` - Get all tasks (paginated)
- **POST** `/api/tasks` - Create new task
- **GET** `/api/tasks/{id}` - Get task by ID
- **PUT** `/api/tasks/{id}` - Update task
- **DELETE** `/api/tasks/{id}` - Delete task
- **GET** `/api/tasks/status/{status}` - Get tasks by status
- **GET** `/api/tasks/priority/{priority}` - Get tasks by priority
- **GET** `/api/tasks/search` - Search tasks

### Dashboard

- **GET** `/api/dashboard` - Get dashboard statistics

## Swagger Documentation

Once the application is running, access the Swagger UI:
```
http://localhost:8080/swagger-ui.html
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  KEY idx_email (email)
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM',
  status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  KEY idx_user_id (user_id),
  KEY idx_status (status),
  KEY idx_priority (priority)
);
```

## Key Features

### Authentication & Security
- JWT token-based authentication
- BCrypt password encryption
- Role-based access control
- Stateless authentication
- Token expiration handling (24 hours)

### Task Management
- Create, read, update, delete operations
- Full search capabilities (title, description)
- Filter by status and priority
- Sort by multiple fields
- Pagination support
- User isolation (users see only their tasks, admins see all)

### Error Handling
- Global exception handler
- Custom exceptions
- Meaningful error messages
- HTTP status codes

### Data Validation
- Input validation with annotations
- Bean validation (JSR-303)
- Transactional operations
- Data integrity checks

### API Documentation
- Swagger/OpenAPI integration
- Auto-generated documentation
- Interactive API testing

## Configuration Properties

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
app.jwt-secret=your_secret_key
app.jwt-expiration-milliseconds=86400000

# Logging
logging.level.root=INFO
logging.level.com.taskmanager=DEBUG

# Swagger
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

## Request Examples

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Complete project",
    "description": "Finish the full stack project",
    "priority": "HIGH",
    "status": "IN_PROGRESS",
    "dueDate": "2024-12-31"
  }'
```

### Get All Tasks
```bash
curl http://localhost:8080/api/tasks?page=0&size=10 \
  -H "Authorization: Bearer <token>"
```

## Testing

### Run Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=TaskServiceImplTest
```

### Run with Coverage
```bash
mvn clean test jacoco:report
```

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check database name and credentials
- Verify MySQL JDBC driver in pom.xml

### Port 8080 Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

### JWT Token Errors
- Ensure token is sent in Authorization header
- Check token format: `Bearer <token>`
- Verify token hasn't expired

### Build Failures
```bash
# Clean and rebuild
mvn clean
mvn install
```

## Performance Tips

- Enable query pagination for large datasets
- Use appropriate database indexes
- Enable SQL query logging only in development
- Use lazy loading for associations
- Implement caching for frequently accessed data (future enhancement)

## Future Enhancements

- [ ] Task categories/tags
- [ ] Task assignments to other users
- [ ] Task comments and discussions
- [ ] Email notifications
- [ ] Activity audit logs
- [ ] Task reminders
- [ ] Recurring tasks
- [ ] Subtasks
- [ ] Time tracking
- [ ] File attachments
- [ ] Rate limiting
- [ ] Caching with Redis

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Spring Boot**
