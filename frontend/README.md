# Task Management Frontend

React.js frontend for the Full Stack Task Management System.

## Features

- ✅ User Authentication (Login/Register)
- ✅ JWT Token Management
- ✅ Task Management (Create, Read, Update, Delete)
- ✅ Task Filtering (Status, Priority)
- ✅ Task Search
- ✅ Pagination & Sorting
- ✅ Dashboard with Statistics
- ✅ Responsive Design
- ✅ Role-based Access Control

## Tech Stack

- **React 18** - UI Library
- **React Router v6** - Client-side Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **Vite** - Build Tool & Dev Server
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── DashboardCard.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── Sidebar.jsx
│   ├── TaskFilters.jsx
│   ├── TaskForm.jsx
│   └── TaskTable.jsx
├── context/            # Context API for state management
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks (future)
├── layouts/            # Page layouts
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
├── pages/              # Page components
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── dashboard/
│   │   └── DashboardPage.jsx
│   ├── error/
│   │   └── NotFoundPage.jsx
│   ├── profile/
│   │   └── ProfilePage.jsx
│   └── tasks/
│       ├── CreateTaskPage.jsx
│       ├── EditTaskPage.jsx
│       └── TaskListPage.jsx
├── services/           # API services
│   ├── api.js         # Task & Auth API calls
│   └── apiClient.js   # Axios instance with interceptors
├── styles/            # Global styles
│   └── index.css
├── utils/             # Utility functions
│   └── helpers.js
├── App.jsx            # Main App component
└── main.jsx          # Entry point

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**
   ```bash
   cp .env.local .env.local
   ```

4. **Update API URL in .env.local (if needed)**
   ```
   VITE_API_URL=http://localhost:8080/api
   ```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## API Integration

The frontend communicates with the Spring Boot backend via REST API endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks (paginated)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get single task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/status/{status}` - Get tasks by status
- `GET /api/tasks/priority/{priority}` - Get tasks by priority
- `GET /api/tasks/search?keyword=` - Search tasks

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Key Features Explained

### Authentication
- JWT tokens stored in localStorage
- Automatic token attachment to requests via Axios interceptor
- Automatic logout on 401 Unauthorized response
- Protected routes using `ProtectedRoute` component

### Task Management
- Create new tasks with title, description, priority, status, and due date
- Edit existing tasks
- Delete tasks (with confirmation)
- View task details

### Filtering & Search
- Filter tasks by status (Pending, In Progress, Completed)
- Filter tasks by priority (Low, Medium, High)
- Search tasks by title or description
- Sort tasks by different fields
- Pagination with adjustable page size

### Dashboard
- Total tasks count
- Pending tasks count
- In Progress tasks count
- Completed tasks count
- Overdue tasks count

## Performance Considerations

- Lazy loading of components (React Router)
- Efficient state management using Context API
- Debounced search (can be added for optimization)
- Responsive images and CSS
- Optimized bundle size with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend is running on `http://localhost:8080` and the frontend is configured with the correct API URL.

### 401 Unauthorized
This typically means your JWT token has expired. Log out and log back in.

### Module Not Found Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

- [ ] Custom hooks for API calls
- [ ] State management with Redux/Zustand
- [ ] Form validation library (React Hook Form)
- [ ] Dark mode support
- [ ] Task notifications
- [ ] Task categories/tags
- [ ] Collaborative task assignments
- [ ] Activity logs
- [ ] Export tasks to CSV/PDF
- [ ] Offline support with Service Workers

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
