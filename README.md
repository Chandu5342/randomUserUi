title: "User Dashboard Frontend"

description: >
  This is the frontend for the User Dashboard web application built with
  Vue.js, Bootstrap, and Axios. It consumes the backend API to display
  user data, allows editing, deletion, pagination, and search/filtering.

features:
  - "Dashboard to view all users"
  - "Fetch & Insert users from public API"
  - "Edit user details (Name, Email, City)"
  - "Delete users"
  - "Pagination and search/filter by Name, Email, City"
  - "Responsive design using Bootstrap"
  - "Modular components (UserTable, EditUserModal, SearchBar)"
  - "Connects to backend API"

```
folder_structure: |
  frontend/
    ├── src/
    │   ├── api/            # API calls to backend
    │   │   └── users.js
    │   ├── components/     # Reusable components (UserTable, EditUserModal, SearchBar)
    │   ├── pages/          # Pages (Dashboard)
    │   ├── App.vue         # Route setup
    │   ├── main.js         # Vue app entry point
    │   └── assets/         # Styles, images
```

env_variables: |
  VUE_APP_API_URL=http://localhost:5000/api


api_usage:
  - method: POST
    endpoint: "/api/users/fetch"
    description: "Fetch users from public API and insert into DB"
  - method: GET
    endpoint: "/api/users"
    description: "Fetch all users from DB"
  - method: PUT
    endpoint: "/api/users/:uuid"
    description: "Update user details"
  - method: DELETE
    endpoint: "/api/users/:uuid"
    description: "Delete user by UUID"
```
run_locally: |
  git clone https://github.com/YourUsername/user-dashboard-frontend.git
  cd frontend
  npm install
  npm run serve
```

frontend_url: "http://localhost:8080"
