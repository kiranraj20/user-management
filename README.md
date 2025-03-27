# User Management React Application

This is a **React-based application** built with *TypeScript*, *Redux*, and *Tailwind CSS*, integrating with the [Reqres API](https://reqres.in/) for user authentication and management. The app features a login screen, a paginated users list with edit/delete capabilities, client-side search/filtering, toast notifications, and token expiration handling, styled with an iOS-inspired UI.

## Features
- **Authentication**: Login with email and password, storing a token in local storage.
- **Users List**: Paginated list of users with first name, last name, and avatar.
- **CRUD Operations**: Edit and delete users with appropriate success/error feedback.
- **Toast Notifications**: Custom toast at the bottom-right corner for success/error messages.
- **Token Expiration**: Redirects to login page if the token is invalid or expires (simulated).
- **Search & Filter**: Client-side filtering of users by name or email.
- **Responsive UI**: iOS-like design with gradients, rounded edges, and frosted glass effects.

## Prerequisites
- **Node.js**: Version 16.x or higher.
- **npm**: Version 8.x or higher (comes with Node.js).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd user-management
2. **Install Dependencies**: Install all required packages using npm:
npm install
*This installs*:
react, react-dom, react-router-dom for routing.
@reduxjs/toolkit, react-redux for state management.
axios for HTTP requests.
tailwindcss, postcss, autoprefixer for styling.
TypeScript dependencies.
3. **Set Up Tailwind CSS**: Tailwind is already configured. Ensure the following files exist:
*tailwind.config.js*:
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
*src/index.css*:
@tailwind base;
@tailwind components;
@tailwind utilities;
4. **Running the Project**
*Start the Development Server*:
npm start
The app will run at http://localhost:3000 and open in your default browser.
*Test Login*:
Use the following credentials:
Email: eve.holt@reqres.in
Password: cityslicka
Invalid inputs will show toast errors (e.g., invalid email or short password).
*Explore Features*:
Navigate to the users list after login.
Use the search bar to filter users by name or email.
Edit or delete users and observe toast notifications.
Simulate token expiration by removing the token from localStorage (localStorage.removeItem("token")) and refreshing the page.
5. **Project Structure**
user-management/
├── src/
│   ├── components/
│   │   ├── Login.tsx         # Login screen with validation
│   │   ├── Users.tsx         # Users list with search, edit, delete
│   │   └── Toast.tsx         # Custom toast notification component
│   ├── store/
│   │   ├── authSlice.ts      # Redux slice for authentication
│   │   ├── usersSlice.ts     # Redux slice for user data
│   │   └── index.ts          # Redux store configuration
│   ├── App.tsx               # Main app with routing
│   ├── index.tsx             # Entry point with Redux Provider
│   └── index.css             # Tailwind CSS setup
├── tailwind.config.js        # Tailwind configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
6. **Assumptions and Considerations**
*Token Expiration*:
The Reqres API doesn’t enforce token expiration or validation. Token expiration is simulated by checking for 401/403 responses or a missing token. In a real application, you’d decode the JWT or use an API endpoint to verify token validity.
*API Limitations*:
Reqres API doesn’t persist changes (e.g., edits or deletes are mocked). Updates and deletions are reflected only in the client-side state.
Search/filtering is client-side and limited to the current page’s data. Server-side search would require a different API endpoint.
*Validation*:
Email validation uses a basic regex ([^\s@]+@[^\s@]+\.[^\s@]+).
Password must be at least 6 characters. Adjust these rules as needed for stricter requirements.
*Styling*:
The UI mimics iOS with gradients, rounded edges, and frosted glass effects using Tailwind CSS. It’s responsive but optimized for desktop and mobile portrait views.
*State Management*:
Redux is used for authentication and user data. Local component state (useState) handles temporary UI states like the edit form and search query.
*Error Handling*:
Errors and success messages are shown via a custom toast component with a 3-second auto-dismiss.
7. **Troubleshooting**
Dependencies Fail to Install: Ensure Node.js and npm are up-to-date. Delete node_modules and package-lock.json, then run npm install again.
API Errors: Check your internet connection and the Reqres API status. Console errors can help diagnose issues.
Styling Issues: Verify Tailwind is correctly configured and the index.css file includes the required directives.
8. **Future Improvements**
Add server-side search/filtering if the API supports it.
Implement debouncing for the search input to improve performance.
Enhance token validation with JWT decoding or a refresh token mechanism.
Add logout functionality with a button in the UI.