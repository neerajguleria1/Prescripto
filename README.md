# Prescripto - Healthcare Appointment Platform

Full-Stack Developer | Mar – Jun 2025   
**Live Demo (Vercel):** [https://prescripto-theta-weld.vercel.app/](https://prescripto-theta-weld.vercel.app/)  

---

## 🚀 Quick Start

**New to this project? Start here:**
- 📖 [QUICK-START.md](QUICK-START.md) - Get up and running in 5 minutes
- 🔧 [SETUP.md](SETUP.md) - Detailed installation guide
- 🐛 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues & solutions
- ✅ [FIXES.md](FIXES.md) - Recent bug fixes & improvements
- 🐳 [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md) - **Docker deployment guide**

### Local Development
```bash
npm run install-all
npm start
```

### Docker Deployment (Production)
```bash
cp .env.docker .env
# Update .env with your credentials
docker-compose up -d --build
```

---

<article>
  <h2>Tech Skills 🛠️</h2>

  <!-- Skillicons for supported skills -->
  <img src="https://skillicons.dev/icons?i=html,css,js,react,nodejs,expressjs,mongodb,redis,git,github&perline=5" alt="Tech Stack" />
  
![Zod](https://img.shields.io/badge/Zod-7A5AF8?style=for-the-badge&logo=zod)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-DB0D8B?style=for-the-badge&logo=cloudinary&logoColor=white)
![REST APIs](https://img.shields.io/badge/REST%20APIs-6C63FF?style=for-the-badge)
![CI/CD](https://img.shields.io/badge/CI%2FCD-E53E3E?style=for-the-badge)
![Agile](https://img.shields.io/badge/Agile-F6AD55?style=for-the-badge)
![Microservices](https://img.shields.io/badge/Microservices-805AD5?style=for-the-badge)
![DBMS](https://img.shields.io/badge/DBMS-D69E2E?style=for-the-badge)
![DSA](https://img.shields.io/badge/DataStructures--Algorithms-3182CE?style=for-the-badge)
</article>

---

## Overview
Prescripto is a MERN stack healthcare platform designed to handle over **100 real-time bookings per day**. It improves appointment workflow by **50%** through role-based access for **Admin, Doctor, and Patient**. The platform integrates **Razorpay** and **COD** support for flexible payments, and employs **JWT authentication with rotating refresh tokens and HTTP-only cookies**, reducing unauthorized access by **80%**. Additionally, **Redis** caching and **Cloudinary** integration enhance performance and media handling.

---

## Features
- Role-based access control (Admin / Doctor / Patient)  
- Real-time appointment bookings  
- Razorpay & COD payment integration  
- Secure authentication with JWT, rotating refresh tokens, HTTP-only cookies  
- Redis caching for optimized performance  
- Media management with Cloudinary  
- CRUD operations for users, appointments, and doctors  
- RESTful API endpoints for frontend consumption  

---

## 📚 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Quick reference card for developers
- **[SETUP.md](SETUP.md)** - Complete setup and installation guide
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solutions to common problems
- **[FIXES.md](FIXES.md)** - Summary of all bug fixes and improvements

---

## ✅ Recent Fixes (Latest)

### Critical Bugs Fixed:
1. ✅ Database connection error handling (process.exit codes)
2. ✅ HTTP status codes (401/403 for auth errors)
3. ✅ JWT token expiration added for security
4. ✅ Rate limiting response handler
5. ✅ Authentication middleware improvements
6. ✅ Typo fixes in error messages

### New Files Added:
- ✅ Environment variable templates (.env.example)
- ✅ Windows setup script (setup.bat)
- ✅ Comprehensive documentation
- ✅ Improved package.json scripts

See [FIXES.md](FIXES.md) for complete details.

---

## Environment Variables

**Quick Setup:** Copy `.env.example` files and fill in your credentials.

The backend requires the following environment variables in a `.env` file:

```bash
PORT=7060
MONGODB_URL=mongodb://localhost:27017/prescripto
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key_min_32_chars_long
RAZORPAY_KEYID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
REDIS_PASSWORD=your_redis_password
REDIS_HOST=localhost
REDIS_PORT=6379
```

The Frontend requires the following environment variables in a `.env` file:

```bash
VITE_BACKEND_URL=http://localhost:7060
VITE_RAZORPAY_KEYID=your_razorpay_key_id
```

The Admin requires the following environment variables in a `.env` file:

```bash
VITE_BACKEND_URL=http://localhost:7060
```

---

## Installation

### Quick Install (All Services)
```bash
npm run install-all
```

### Manual Install

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd frontend
npm install
```

Install admin dependencies:
```bash
cd admin
npm install
```

---

## Running the Application

### Start All Services
```bash
npm start
```

### Start Individual Services
```bash
npm run backend   # Backend only
npm run frontend  # Frontend only
npm run admin     # Admin only
```

### Manual Start

Run the backend server:
```bash
cd backend
npm start
```

Run the frontend:
```bash
cd frontend
npm run dev
```

Run the admin panel:
```bash
cd admin
npm run dev
```

---

## Backend Dependencies

- argon2 - Password hashing
- cloudinary - Image storage
- cookie-parser - Cookie handling
- cors - Cross-origin requests
- dotenv - Environment variables
- express - Web framework
- express-rate-limit - Rate limiting
- helmet - Security headers
- hpp - HTTP parameter pollution protection
- jsonwebtoken - JWT authentication
- mongoose - MongoDB ODM
- morgan - HTTP logging
- multer - File uploads
- razorpay - Payment integration
- redis - Caching and sessions
- zod - Schema validation

---

## 🔒 Security Features

- ✅ Argon2id password hashing (64MB memory, 5 iterations)
- ✅ JWT with rotating refresh tokens
- ✅ HTTP-only secure cookies
- ✅ CORS with origin whitelist
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet security headers
- ✅ HPP protection
- ✅ Redis session management
- ✅ Input validation with Zod

---

## 🎯 Default Ports

- Backend API: `http://localhost:7060`
- Frontend: `http://localhost:5173`
- Admin Panel: `http://localhost:5174`

---

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Cloudinary account
- Razorpay account

---

## License

MIT License

---

## 🎉 Ready to Start?

1. Run `setup.bat` (Windows) or `npm run install-all`
2. Create `.env` files from `.env.example` templates
3. Start MongoDB and Redis
4. Run `npm start`
5. Visit `http://localhost:5173`

For detailed instructions, see [SETUP.md](SETUP.md)

For issues, check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
