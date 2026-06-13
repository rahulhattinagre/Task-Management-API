# 🚀 Quick Start Guide - Task Management System

Get the Task Management System up and running in 5 minutes!

## Prerequisites

- Java 21 JDK
- Node.js 16+
- MySQL 8.0+
- Git

## One-Time Setup

### 1. Database Setup

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE task_management_db;

# Exit MySQL
EXIT;
```

### 2. Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

## Development Startup

### Start Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

Backend will be available at `http://localhost:8080`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Access the Application

Open your browser and navigate to: **http://localhost:3000**

### Test Credentials

```
Email: user@example.com
Password: password123

Or register a new account
```

## Key URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html

## First Steps

1. **Register/Login**
   - Navigate to login page
   - Register new account or use test credentials
   - Receive JWT token

2. **Create a Task**
   - Click "New Task" button
   - Fill in task details (title, description, priority, status, due date)
   - Click "Save Task"

3. **Manage Tasks**
   - View all your tasks in the task list
   - Filter by status or priority
   - Search for specific tasks
   - Edit or delete tasks

4. **View Dashboard**
   - Check dashboard for task statistics
   - See total, pending, in-progress, and completed tasks

## Common Issues & Solutions

### Backend won't start
```bash
# Clear Maven cache
mvn clean
mvn install

# Try again
mvn spring-boot:run
```

### Port 3000 already in use
```bash
# Find and kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Database connection error
- Ensure MySQL is running
- Check username/password in application.properties
- Verify database exists

### CORS errors
- Ensure backend is running on port 8080
- Check frontend API URL in .env.local

## Next Steps

1. **Explore the Application**
   - Create multiple tasks
   - Try different filters and searches
   - Update task statuses

2. **Read Documentation**
   - [Backend README](backend/README.md)
   - [Frontend README](frontend/README.md)
   - [Full README](README.md)

3. **API Testing**
   - Visit Swagger UI: http://localhost:8080/swagger-ui.html
   - Test API endpoints directly
   - Use Postman for advanced testing

## Production Deployment

### Build Backend
```bash
cd backend
mvn clean package
java -jar target/task-manager-0.0.1-SNAPSHOT.jar
```

### Build Frontend
```bash
cd frontend
npm run build
# dist folder contains production-ready files
```

## Need Help?

- Check the main [README.md](README.md)
- Review [Backend README](backend/README.md)
- Review [Frontend README](frontend/README.md)
- Check troubleshooting sections in respective READMEs

---

**Happy Task Managing! 📋✅**
