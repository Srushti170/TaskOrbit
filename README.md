# MERN Task Management Application

A production-ready full-stack task management application build using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Role-Based Access**: 
  - `user`: Can manage their own tasks.
  - `admin`: Can view all tasks and all registered users.
- **Task Management CRUD**: Create, Read, Update, Delete tasks with statuses (Pending, In Progress, Completed).
- **Modern UI**: Clean vanilla CSS design system featuring dark mode support, glassmorphism, responsive grid layouts, and micro-animations.

## Technology Stack

- **Frontend**: React, Vite, React Router, Context API, Axios, Next-gen Vanilla CSS.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT.

## Project Structure

- `frontend/`: The Vite React application.
- `backend/`: The Node.js Express server.

## Installation & Setup

1. **Clone and Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Backend Environment Variables**
   Ensure your `backend/.env` file is properly configured.
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
   JWT_SECRET=supersecret12345
   NODE_ENV=development
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

This project uses a dual-server development setup.

**Start the Backend (API Server):**
```bash
cd backend
npm start
```
*(The API runs on `http://localhost:5000`)*

**Start the Frontend (Dev Server):**
```bash
cd frontend
npm run dev
```
*(The React app runs on `http://localhost:5173` and proxies API requests to port 5000)*

## Assigning an Admin Role

By default, new users register with the `user` role. To grant an `admin` role to a user, access your MongoDB instance and update the user's document manually:
```json
{
  "$set": { "role": "admin" }
}
```

## Build for Production

```bash
cd frontend
npm run build
```
The output will be inside `frontend/dist/`.
