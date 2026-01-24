Resume Builder

A Modern Full-Stack Resume Building Platform

A scalable, full-stack Resume Builder application built with a modern frontend and a robust backend architecture. The project follows clean separation of concerns, enabling independent development and deployment of frontend and backend services.

Overview

This application allows users to create, manage, and preview professional resumes through a responsive UI powered by a RESTful backend.

Frontend built with Vite for speed and modern DX

Backend built with Laravel for reliability and scalability

API-driven architecture suitable for future expansion

Designed with maintainability and real-world usage in mind

Repository Structure
resume-builder/
│
├── resume-builder-frontend/    # Vite-based frontend application
│
├── resume-builder-backend/     # Laravel backend (REST API)
│
└── README.md

Technology Stack
Frontend

Vite

React

JavaScript / TypeScript

Tailwind CSS (if applicable)

Axios / Fetch API

Backend

Laravel

PHP 8+

MySQL / PostgreSQL

RESTful API architecture

Authentication-ready (Sanctum / JWT if enabled)

Key Features

User authentication (login / signup)

Resume creation and editing

Structured resume sections (education, experience, skills, projects)

Live resume preview

Clean API separation between frontend and backend

Scalable project structure for future enhancements

Prerequisites

Ensure the following tools are installed on your system:

Node.js (v18+ recommended)

npm or yarn

PHP (v8.1+ recommended)

Composer

MySQL or PostgreSQL

Git

Frontend Setup (Vite)
cd resume-builder-frontend
npm install
npm run dev


Frontend development server will start at:

http://localhost:5173

Backend Setup (Laravel)
cd resume-builder-backend
composer install
cp .env.example .env
php artisan key:generate

Database Configuration

Update your .env file with database credentials:

DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

Run Migrations
php artisan migrate

Start Backend Server
php artisan serve


Backend server will be available at:

http://localhost:8000

Frontend–Backend Integration

Laravel exposes REST APIs under /api

Frontend consumes APIs using Axios / Fetch

Configure API base URL in frontend environment file

Example (.env in frontend):

VITE_API_BASE_URL=http://localhost:8000/api

Development Workflow
Create feature branch
→ Develop frontend/backend features
→ Commit changes with meaningful messages
→ Push to GitHub
→ Merge into main branch

Version Control Commands
git add .
git commit -m "Describe your change clearly"
git push origin main

Future Enhancements

Multiple resume templates

PDF export functionality

Drag-and-drop resume sections

Admin dashboard

Resume sharing via public links

Multi-language support

License

This project is licensed under the MIT License.

Author

Arjo Ghosh
Full-Stack Developer | Open-Source Enthusiast
