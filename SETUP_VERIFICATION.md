# ✅ Setup Verification Checklist

Use this checklist to verify your Task Management System is properly set up and working.

## 📋 Prerequisites

- [ ] Java 21 JDK installed (`java -version` returns 21.x.x)
- [ ] Node.js 16+ installed (`node --version` returns 16+)
- [ ] npm installed (`npm --version` returns 8+)
- [ ] MySQL 8.0+ installed and running
- [ ] Git installed
- [ ] A code editor (VSCode, IntelliJ IDEA, etc.)

## 🗄️ Database Setup

- [ ] MySQL server is running
- [ ] Database created: `CREATE DATABASE task_management_db;`
- [ ] Backend credentials configured in `application.properties`
  - [ ] URL: `jdbc:mysql://localhost:3306/task_management_db`
  - [ ] Username: Set correctly
  - [ ] Password: Set correctly
- [ ] Tables auto-created by Hibernate (run backend once)

## 🔧 Backend Setup

- [ ] Navigate to `backend` directory
- [ ] Run `mvn clean install`
  - [ ] No build errors
  - [ ] All dependencies downloaded
- [ ] Run `mvn spring-boot:run`
  - [ ] Application started successfully
  - [ ] Console shows "Started TaskApplication"
  - [ ] No database connection errors
- [ ] Backend accessible at `http://localhost:8080`
- [ ] Swagger UI accessible at `http://localhost:8080/swagger-ui.html`

### Backend Test Calls

- [ ] `curl http://localhost:8080/api/auth/login`
  - [ ] Returns 400 (bad request as expected, no auth)
- [ ] `curl http://localhost:8080/swagger-ui.html`
  - [ ] Swagger UI loads successfully

## 📱 Frontend Setup

- [ ] Navigate to `frontend` directory
- [ ] Run `npm install`
  - [ ] No errors
  - [ ] All dependencies installed
  - [ ] `node_modules` folder created
- [ ] Run `npm run dev`
  - [ ] Dev server started
  - [ ] No build errors
  - [ ] Shows "Local: http://localhost:3000"
- [ ] Frontend accessible at `http://localhost:3000`
  - [ ] Page loads in browser
  - [ ] Login form visible

## 🔐 Authentication Testing

### User Registration
- [ ] Open browser to `http://localhost:3000`
- [ ] Click "Sign up here" on login page
- [ ] Fill in registration form:
  - [ ] Name: Test User
  - [ ] Email: testuser@example.com
  - [ ] Password: password123
  - [ ] Confirm Password: password123
- [ ] Click "Create Account"
- [ ] Should redirect to login page with success message
- [ ] Check console for any errors

### User Login
- [ ] Enter email: testuser@example.com
- [ ] Enter password: password123
- [ ] Click "Sign In"
- [ ] Should redirect to dashboard
- [ ] User name displayed in top navbar
- [ ] No errors in browser console

## 📊 Dashboard Testing

After successful login:
- [ ] Dashboard page loads
- [ ] All 5 statistic cards visible:
  - [ ] Total Tasks (0 initially)
  - [ ] Pending (0)
  - [ ] In Progress (0)
  - [ ] Completed (0)
  - [ ] Overdue (0)
- [ ] Welcome message displayed
- [ ] No JavaScript errors in console

## 📝 Task Creation Testing

- [ ] Click "New Task" button
- [ ] Create Task form loads
- [ ] Fill in task form:
  - [ ] Title: "Test Task"
  - [ ] Description: "This is a test task"
  - [ ] Priority: "HIGH"
  - [ ] Status: "PENDING"
  - [ ] Due Date: Select future date
- [ ] Click "Save Task"
- [ ] Should redirect to task list
- [ ] Task appears in the table
- [ ] Dashboard updates (Total Tasks = 1)
- [ ] No errors in console

## 📋 Task Management Testing

### View Tasks
- [ ] Go to "My Tasks" page
- [ ] Task list loads with:
  - [ ] Table headers visible
  - [ ] Your task displayed in table
  - [ ] Title, Priority, Status, Due Date visible
- [ ] No errors in console

### Filter Tasks
- [ ] Select Status filter: "PENDING"
  - [ ] Table updates with pending tasks only
- [ ] Select Priority filter: "HIGH"
  - [ ] Table updates with high priority tasks only
- [ ] Clear filters
  - [ ] All tasks visible again
- [ ] No errors in console

### Search Tasks
- [ ] Type in search box: "Test"
  - [ ] Table filters by keyword
  - [ ] Shows matching tasks
- [ ] Clear search
  - [ ] All tasks visible again
- [ ] No errors in console

### Edit Task
- [ ] Click "Edit" (pencil icon) on task
- [ ] Edit page loads with task details
- [ ] Change task status to "IN_PROGRESS"
- [ ] Click "Save Task"
- [ ] Redirects to task list
- [ ] Status updated in table
- [ ] Dashboard updates (In Progress = 1)
- [ ] No errors in console

### Delete Task
- [ ] Click "Delete" (trash icon) on task
- [ ] Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] Task removed from table
- [ ] Dashboard updates
- [ ] No errors in console

## 👤 Profile Page Testing

- [ ] Click user name or avatar in navbar
- [ ] Go to "Profile" page
- [ ] Profile displays:
  - [ ] User avatar with initials
  - [ ] User name
  - [ ] Email address
  - [ ] Role (USER or ADMIN)
  - [ ] Member since date
- [ ] No errors in console

## 🚪 Logout Testing

- [ ] Click logout icon in navbar
- [ ] Redirects to login page
- [ ] Cannot access dashboard anymore
  - [ ] Typing URL directly redirects to login
- [ ] Can login again successfully

## 🔄 Pagination & Sorting Testing

- [ ] Create multiple tasks (15+)
- [ ] Go to task list
- [ ] Pagination controls visible
- [ ] Click "Next" page
  - [ ] Different tasks shown
- [ ] Click "Previous" page
  - [ ] Back to first page
- [ ] Sorting appears to work (if implemented)

## 📱 Responsive Design Testing

### Mobile View (< 640px)
- [ ] Open browser DevTools
- [ ] Set device to iPhone 12
- [ ] Layout adjusts properly
  - [ ] Sidebar collapses to menu icon
  - [ ] Content takes full width
  - [ ] Cards stack vertically
  - [ ] All buttons clickable
  - [ ] Tables scroll horizontally

### Tablet View (640px - 1024px)
- [ ] Set device to iPad
- [ ] Layout adjusts properly
  - [ ] Sidebar visible or collapsible
  - [ ] 2-3 column layout where appropriate

### Desktop View (> 1024px)
- [ ] Set device to Desktop
- [ ] Full layout visible
- [ ] All features accessible

## 🌐 API Testing (Optional - Using Swagger)

- [ ] Open `http://localhost:8080/swagger-ui.html`
- [ ] Click "auth-controller" section
- [ ] Try it out for POST `/api/auth/login`
  - [ ] Fill in email and password
  - [ ] Execute
  - [ ] Should return 200 with token
- [ ] Try it out for GET `/api/tasks`
  - [ ] Authorize using token from login
  - [ ] Execute
  - [ ] Should return list of tasks
- [ ] No errors in responses

## ✅ Error Handling Testing

### Invalid Login
- [ ] Try login with wrong password
  - [ ] Error message displays
  - [ ] Page doesn't crash

### Required Field
- [ ] Create task without title
  - [ ] Form validation shows error
  - [ ] Cannot submit

### Network Error Simulation
- [ ] Stop backend server
- [ ] Try any action on frontend
  - [ ] Error message displays (if implemented)
  - [ ] App doesn't crash

## 🔒 Security Testing

- [ ] JWT token stored in localStorage (check DevTools → Application)
- [ ] Token sent in Authorization header (check Network tab)
- [ ] Logout clears token from localStorage
- [ ] Protected routes cannot be accessed without token
- [ ] Token format: `Bearer <token>`

## 🐛 Console Check

- [ ] Browser DevTools → Console tab is clean
- [ ] No red errors
- [ ] No warnings (or acceptable warnings only)
- [ ] No 404s for resources

## 📊 Network Tab Check

- [ ] Open DevTools → Network tab
- [ ] Perform login
- [ ] Check request to `/api/auth/login`
  - [ ] Status: 200
  - [ ] Headers include Authorization
- [ ] Check subsequent requests
  - [ ] All have Authorization header
  - [ ] Status codes are appropriate (200, 400, 401, 404, 500)

## 📚 Documentation Check

All documentation files present and readable:
- [ ] README.md - Main documentation
- [ ] backend/README.md - Backend guide
- [ ] frontend/README.md - Frontend guide
- [ ] QUICKSTART.md - Quick start guide
- [ ] DEPLOYMENT.md - Deployment guide
- [ ] CONTRIBUTING.md - Contributing guide
- [ ] PROJECT_COMPLETION_REPORT.md - Completion report
- [ ] PROJECT_SUMMARY.md - Project summary

## 🎯 Performance Checks

### Load Times
- [ ] Frontend loads in < 2 seconds
- [ ] Dashboard loads in < 1 second after login
- [ ] Task list loads in < 1 second
- [ ] API responses < 500ms

### Browser DevTools
- [ ] Lighthouse score > 80 (optional check)
- [ ] No memory leaks (check DevTools → Memory)
- [ ] Appropriate number of network requests

## 📝 Optional - Advanced Verification

### Browser Storage
- [ ] Open DevTools → Application
- [ ] Check localStorage for:
  - [ ] `token` key with JWT value
  - [ ] `user` key with user data

### Performance
- [ ] DevTools → Performance tab
- [ ] Record page load
- [ ] Check for bottlenecks
- [ ] First Contentful Paint < 1s

### Accessibility
- [ ] DevTools → Lighthouse
- [ ] Run accessibility audit
- [ ] Check for any issues

## ✨ Final Checks

- [ ] [ ] System is fully functional
- [ ] [ ] No critical errors
- [ ] [ ] All features working
- [ ] [ ] Documentation accessible
- [ ] [ ] Ready for development/deployment

---

## 🚨 Common Issues & Solutions

### Issue: Cannot connect to database
**Solution**: 
- Ensure MySQL is running: `mysql --version`
- Check credentials in `application.properties`
- Run: `mysql -u root -p` to verify connection

### Issue: Frontend won't connect to backend
**Solution**:
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify API URL in `.env.local`

### Issue: Port already in use
**Solution**:
- Backend (8080): `lsof -i :8080 && kill -9 <PID>`
- Frontend (3000): `lsof -i :3000 && kill -9 <PID>`

### Issue: Dependencies not installing
**Solution**:
- Clear cache: `mvn clean` (backend) or `rm -rf node_modules` (frontend)
- Reinstall: `mvn install` or `npm install`

---

## ✅ Success Criteria

You've successfully set up the Task Management System when:

1. ✅ Backend runs on port 8080 without errors
2. ✅ Frontend runs on port 3000 without errors
3. ✅ Can register a new user
4. ✅ Can login with registered user
5. ✅ Can create, read, update, delete tasks
6. ✅ Can search and filter tasks
7. ✅ Dashboard shows correct statistics
8. ✅ No critical errors in console
9. ✅ All documentation is accessible
10. ✅ Ready to start development!

---

**If all checkboxes are checked, you're ready to go! 🚀**

For troubleshooting beyond this checklist, refer to:
- README.md
- backend/README.md
- frontend/README.md
- QUICKSTART.md
