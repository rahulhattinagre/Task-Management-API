# 🤝 Contributing Guide

Thank you for your interest in contributing to the Task Management System! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome all skill levels
- Provide constructive feedback
- Focus on code, not the person

## Getting Started

### Prerequisites
- Java 21 JDK
- Node.js 16+
- MySQL 8.0+
- Git
- IDE (IntelliJ IDEA or VSCode)

### Development Setup

1. **Fork and Clone Repository**
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set Up Development Environment**
   ```bash
   # Backend setup
   cd backend
   mvn clean install
   
   # Frontend setup
   cd ../frontend
   npm install
   ```

4. **Configure Database**
   - Create database: `CREATE DATABASE task_management_db_dev;`
   - Update `backend/src/main/resources/application.properties`

5. **Start Development Servers**
   ```bash
   # Terminal 1
   cd backend
   mvn spring-boot:run
   
   # Terminal 2
   cd frontend
   npm run dev
   ```

## Contribution Types

### 1. Bug Fixes
- Look for issues labeled `bug`
- Create branch: `fix/issue-description`
- Include test case reproducing the bug
- Reference issue in commit message

### 2. Features
- Check existing issues and discussions
- Create branch: `feature/feature-name`
- Follow architecture patterns
- Add tests for new functionality
- Update documentation

### 3. Documentation
- Update READMEs for clarity
- Add code comments
- Create guides for complex features
- Fix typos

### 4. Testing
- Write unit tests
- Write integration tests
- Improve test coverage
- Test edge cases

### 5. Performance
- Optimize queries
- Improve response times
- Reduce bundle size
- Implement caching

## Coding Standards

### Backend (Java)

#### Naming Conventions
```java
// Classes - PascalCase
public class UserService { }

// Methods/Variables - camelCase
public void getUserById() { }
private String userName;

// Constants - UPPER_SNAKE_CASE
private static final String API_VERSION = "1.0";

// Enums - PascalCase
public enum Priority { LOW, MEDIUM, HIGH }
```

#### Code Style
```java
// Use constructor injection
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
}

// Use meaningful variable names
// GOOD
List<Task> completedTasks = taskRepository.findByStatus(Status.COMPLETED);

// BAD
List<Task> tasks = taskRepository.findByStatus(Status.COMPLETED);

// Use DTOs for responses
public ResponseEntity<ApiResponse<TaskDto>> getTask(@PathVariable Long id) {
    TaskDto taskDto = taskService.getTaskById(id);
    return ResponseEntity.ok(new ApiResponse<>(true, "Success", taskDto));
}
```

#### Best Practices
- [ ] Use dependency injection
- [ ] Implement service layer pattern
- [ ] Use DTOs for data transfer
- [ ] Add proper exception handling
- [ ] Write meaningful comments
- [ ] Follow DRY principle
- [ ] Use appropriate access modifiers
- [ ] Implement proper logging

### Frontend (React/JavaScript)

#### Naming Conventions
```javascript
// Components - PascalCase
function UserProfile() { }

// Functions/Variables - camelCase
function handleUserInput() { }
const userName = "John";

// Constants - UPPER_SNAKE_CASE
const API_TIMEOUT = 5000;

// Hooks - useSomething
function useAuth() { }
```

#### Code Style
```javascript
// Use functional components
function TaskList() {
  const [tasks, setTasks] = useState([]);
  return <div>{/* content */}</div>;
}

// Use proper prop types/defaults
function TaskCard({ task, onEdit, onDelete }) {
  return <div>{task.title}</div>;
}

// Use meaningful names
// GOOD
const handleTaskUpdate = async (id, updates) => { }

// BAD
const update = async (i, u) => { }

// Use custom hooks for logic reuse
function useTaskApi() {
  // shared logic
}
```

#### Best Practices
- [ ] Use functional components
- [ ] Use React hooks
- [ ] Keep components small and focused
- [ ] Use custom hooks for logic reuse
- [ ] Prop drilling minimization with Context
- [ ] Memoize expensive computations
- [ ] Use error boundaries
- [ ] Implement proper error handling
- [ ] Write meaningful comments

## Pull Request Process

### Before Creating PR
1. **Code Changes**
   - Follow coding standards
   - Add comments for complex logic
   - Remove console.logs and debug code
   - Test thoroughly

2. **Testing**
   ```bash
   # Backend
   cd backend
   mvn test
   
   # Frontend
   cd frontend
   npm test
   ```

3. **Documentation**
   - Update README if needed
   - Add code comments
   - Document complex functions

### Creating PR
1. **Commit Messages**
   ```bash
   # Good commit message
   git commit -m "feat: Add task filtering by priority"
   
   # Format: type: description
   # Types: feat, fix, docs, style, refactor, test, chore
   ```

2. **PR Title and Description**
   ```
   Title: Fix: Resolve JWT token expiration issue
   
   Description:
   - Problem: Users were logged out unexpectedly
   - Solution: Properly handle token refresh
   - Changes:
     * Added token refresh mechanism
     * Updated JWT interceptor
     * Added tests
   - Closes #123
   ```

3. **Push Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open PR**
   - Link related issues
   - Add screenshots if UI changes
   - Request reviewers
   - Run CI/CD checks

### Review Process
- Code review by maintainers
- Tests must pass
- Documentation must be updated
- No breaking changes without discussion

## Commit Guidelines

### Format
```
type(scope): description

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic changes)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build/dependency changes

### Examples
```bash
git commit -m "feat(auth): Add remember me functionality"
git commit -m "fix(tasks): Resolve pagination issue"
git commit -m "docs: Update API documentation"
git commit -m "test(tasks): Add unit tests for TaskService"
```

## Issue Reporting

### Bug Report Template
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Include screenshots if applicable

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox
- Java Version: 21
- Node Version: 18
```

### Feature Request Template
```markdown
## Description
What feature would you like?

## Use Case
Why do you need this feature?

## Proposed Solution
How should it work?

## Alternatives
Other solutions you've considered

## Additional Context
Any other information
```

## Running Tests

### Backend Tests
```bash
cd backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=TaskServiceImplTest

# Run with coverage
mvn clean test jacoco:report
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tests added/updated
- [ ] Tests pass
- [ ] No console.logs left
- [ ] No commented-out code
- [ ] Performance impact considered
- [ ] Security implications checked

## Performance Guidelines

### Backend
- Use appropriate database indexes
- Implement pagination for large datasets
- Cache frequently accessed data
- Optimize queries
- Use lazy loading
- Implement request throttling

### Frontend
- Code splitting for routes
- Lazy load components
- Optimize images
- Minimize bundle size
- Debounce expensive operations
- Use React.memo for heavy components

## Documentation Requirements

### Code Comments
```java
// GOOD: Explain WHY, not WHAT
// Fetch tasks for the current user to ensure they don't see others' tasks
List<Task> userTasks = taskRepository.findByUserId(userId);

// BAD: Obvious from code
// Get tasks by user ID
List<Task> tasks = taskRepository.findByUserId(userId);
```

### Function Documentation
```javascript
/**
 * Fetches tasks for the given user with optional filtering
 * @param {string} userId - The user's ID
 * @param {Object} filters - Optional filter object
 * @param {string} filters.status - Filter by status
 * @param {string} filters.priority - Filter by priority
 * @returns {Promise<Array>} Array of task objects
 */
async function fetchUserTasks(userId, filters = {}) {
  // implementation
}
```

## Resources

### Backend
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Guide](https://spring.io/guides/topicals/spring-security-architecture/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

### Frontend
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

## Communication

- **Issues**: For bugs and features
- **Discussions**: For ideas and questions
- **Pull Requests**: For code contributions
- **Email**: support@taskmanager.com

## Licensing

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README

## Questions?

- Check existing issues and discussions
- Review documentation
- Create a new discussion
- Email the maintainers

---

**Thank you for contributing! 🎉**
