
# Task Management System - Backend

This is the backend for the **Task Management System**, built using Nest.js. It provides a robust API for managing tasks and handling user authentication.

---

## Table of Contents

- [Project Description](#project-description)
- [Setup and Installation](#setup-and-installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployed Link](#deployed-link)

---

## Project Description

This project provides a RESTful API for the task management system. It handles user authentication, task CRUD operations, and filtering by task status. The API is designed with scalability and security in mind.

---

## Setup and Installation


### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/fadysamirh/taskify-backend.git
   cd backend
    ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create an .env file and set the following environment variables:
     ```bash
     NODE_ENV=<node-env>
     PORT=<port>
     MONGO_URI=<mongo-uri>
     JWT_SECRET=<your-secret>
     JWT_ACCESS_TOKEN_EXPIRY=<expiry>
     ```
4. Run the development server:
     ```bash
        npm run start:dev
     ```
5. Visit the Swagger API at http://localhost:3000/api.

## Technologies Used
1. Framework: Nest.js
2. Database: MongoDB
3. Authentication: JWT
4. API Documentation: Swagger
5. Validation: class-validator

## Features
1. Authentication: Users can register and log in with hashed password.
2. Task Management: RESTful APIs for creating, updating, deleting, and retrieving tasks and Filter tasks by status (e.g., pending, completed).
3. Security: JWT authentication

## Deployed Link
- [Task Management UI](https://taskify-frontend-git-main-fady-samirs-projects.vercel.app/)
- [Task Management API](https://taskify-api.inplace-eg.com/)