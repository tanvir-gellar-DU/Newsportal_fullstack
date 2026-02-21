<img width="1440" height="900" alt="Screenshot 2026-02-21 at 7 07 58 PM" src="https://github.com/user-attachments/assets/781ae162-64b8-422b-823e-db3d37043b61" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 7 11 22 PM" src="https://github.com/user-attachments/assets/673ae2fb-d623-4811-9cfd-6ee87bad5a91" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 7 35 56 PM" src="https://github.com/user-attachments/assets/ccf632df-772e-43a3-833d-b44ddbf9f21b" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 7 36 43 PM" src="https://github.com/user-attachments/assets/fb77630e-9f2e-4a05-9ddc-ac1979900238" />
<img width="1440" height="900" alt="Screenshot 2026-02-21 at 7 36 06 PM" src="https://github.com/user-attachments/assets/8e31482f-2f98-4c7a-b85f-8066cd685863" />

# News Portal Fullstack Application

This is a full-stack News Portal application built with Node.js, Express, Sequelize (MySQL), and React. The project is designed with a strong emphasis on modern web development best practices, robust architecture, and secure data handling.

## Core Concepts & Technologies

This project implements several key software engineering principles and technologies:

### 1. Token-Based Authentication (JWT)
Security is handled using JSON Web Tokens (JWT). 
* **Mechanism**: Upon successful login, the server generates a JWT containing the user's encoded payload (like ID and role).
* **Usage**: The frontend stores this token and sends it in the `Authorization: Bearer <token>` header for subsequent requests to protected routes.
* **Benefits**: This provides a stateless authentication mechanism, reducing database lookups for session verification and enabling easy scalability.

### 2. Object-Relational Mapping (ORM)
The database interactions are abstracted using **Sequelize**, a promise-based Node.js ORM.
* **Mechanism**: Instead of writing raw SQL queries, database tables are defined as JavaScript classes (Models).
* **Benefits**: It prevents SQL injection attacks, makes the codebase database-agnostic, and allows developers to manage data structures using familiar JavaScript syntax.

### 3. Database Migrations
Database schemas are managed using Sequelize Migrations.
* **Mechanism**: Migrations are version-controlled scripts that describe changes to the database schema (e.g., creating tables, adding columns).
* **Usage**: Running `npx sequelize-cli db:migrate` applies these scripts sequentially.
* **Benefits**: This ensures that the database schema is consistent across all environments (development, staging, production) and among all team members.

### 4. Environment Variables (.env Usage)
Sensitive configurations are stored outside of the source code using `dotenv`.
* **Mechanism**: A `.env` file at the root of the backend contains variables like `DB_PASSWORD`, `JWT_SECRET`, and `PORT`.
* **Benefits**: Keeps secrets out of version control (like Git) and allows different configurations for different environments without changing the code.

### 5. Database Seeders
Initial or mock data is populated using Sequelize Seeders.
* **Mechanism**: Scripts that insert predefined data into the database tables.
* **Usage**: `npx sequelize-cli db:seed:all`
* **Benefits**: Extremely useful for setting up a development environment quickly with dummy news articles, administrative users, or testing scenarios.

### 6. RESTful API Design
The backend exposes a standard RESTful API.
* **Mechanism**: Endpoints are structured around standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and resource URIs (e.g., `/api/news`, `/api/news/:id/comments`).
* **Benefits**: Provides a predictable, standardized interface for the React frontend (or any future mobile app) to interact with the backend resources.

### 7. Request Validation
Incoming data from clients is rigorously checked using `express-validator`.
* **Mechanism**: Middleware functions intercept requests before they reach the controllers to ensure payloads meet specific criteria (e.g., ensuring a title is not empty, email is formatted correctly).
* **Benefits**: Prevents malformed or malicious data from reaching the database and provides descriptive error messages back to the client.

### 8. Separation of Concerns (MVC Architecture)
The application adheres to the Model-View-Controller (MVC) architectural pattern:
* **Models**: Define the data structure and business logic rules (Sequelize Models in `backend/models`).
* **Views**: Handle the presentation layer and user interface (React Components in `frontend/src`).
* **Controllers**: Act as the middleman, processing incoming HTTP requests, communicating with the Models, and sending the appropriate JSON responses (Express Controllers in `backend/controllers`).
* **Routes**: A dedicated routing layer maps endpoints to specific controller actions (`backend/routes`).

## Getting Started

### Prerequisites
* Node.js
* MySQL Server

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on your environment.
4. Run migrations: `npx sequelize-cli db:migrate`
5. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React app: `npm run dev`





