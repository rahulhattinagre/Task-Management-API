# TODO (Design/UI Refactor)

- [x] Add centralized UI design tokens/classes to `frontend/src/styles/index.css` (card, headers, gradients, badges)
- [ ] Add shared “Design Hole” semantic classes and migrate UI to use them
  - [x] Add semantic classes to `frontend/src/styles/index.css` (app-card, app-button, app-alert, app-chip, section header)
  - [x] Update layouts/components to use shared classes:
    - [x] `MainLayout`, `Navbar`, `Sidebar`
    - [x] `DashboardPage`, `TaskListPage`, `SettingsPage`
    - [x] `TaskTable`
  - [ ] Update auth experience UI consistency (Login + AuthLayout)
  - [x] Run frontend build and ensure it compiles


