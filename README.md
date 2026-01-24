<div align="center">
🎨 Resume Builder
A Modern Full-Stack Resume Building Platform
<p align="center"> <img src="https://img.shields.io/badge/Frontend-Vite%20%2B%20React-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/Backend-Laravel-EF3B2D?style=for-the-badge&logo=laravel&logoColor=white" /> <img src="https://img.shields.io/badge/API-RESTful-0A0A0A?style=for-the-badge" /> </p> <p align="center"> <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" /> <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" /> <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=flat-square" /> </p> </div>
✨ Overview

Resume Builder is a scalable, full-stack web application designed to help users create, manage, and preview professional resumes with ease.

The project follows a decoupled architecture, enabling independent development of frontend and backend services while maintaining clean API boundaries.

🗂️ Project Structure
resume-builder/
│
├── resume-builder-frontend/    # Vite + React frontend
│
├── resume-builder-backend/     # Laravel backend (REST API)
│
└── README.md

🧰 Tech Stack
🎨 Frontend

⚡ Vite

⚛️ React

🟨 JavaScript / TypeScript

💨 Tailwind CSS (if enabled)

🌐 Axios / Fetch API

🛠 Backend

🔴 Laravel

🐘 PHP 8+

🗄 MySQL / PostgreSQL

🔐 Authentication-ready (Sanctum / JWT)

📡 RESTful APIs

🚀 Features

👤 User authentication (login / signup)

📝 Resume creation & editing

📂 Structured resume sections

👀 Live resume preview

🔗 API-driven frontend–backend communication

📈 Scalable and maintainable architecture

⚙️ Prerequisites

Ensure you have the following installed:

🟢 Node.js (v18+)

📦 npm or yarn

🐘 PHP (v8.1+)

🎼 Composer

🗄 MySQL / PostgreSQL

🔧 Git

▶️ Frontend Setup (Vite)
cd resume-builder-frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

▶️ Backend Setup (Laravel)
cd resume-builder-backend
composer install
cp .env.example .env
php artisan key:generate

🗄 Database Configuration

Update .env:

DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

🔄 Run Migrations
php artisan migrate

▶️ Start Backend Server
php artisan serve


Backend runs at:

http://localhost:8000

🔗 Frontend–Backend Integration

Backend APIs exposed under /api

Frontend consumes APIs via Axios / Fetch

Configure API base URL in frontend .env

VITE_API_BASE_URL=http://localhost:8000/api

🔄 Development Workflow
Create feature branch
→ Develop frontend/backend
→ Commit meaningful changes
→ Push to GitHub
→ Merge into main

🧪 Version Control
git add .
git commit -m "Clear and descriptive message"
git push origin main

🌱 Future Enhancements

📄 Multiple resume templates

📤 PDF export

🧲 Drag-and-drop sections

🛠 Admin dashboard

🌍 Multi-language support

🔗 Public resume sharing

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Arjo Ghosh
Full-Stack Developer • Open-Source Enthusiast
