# Prescripto - Setup & Installation Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Cloudinary account
- Razorpay account

## Installation Steps

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```env
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

Start backend:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/` directory:
```env
VITE_BACKEND_URL=http://localhost:7060
VITE_RAZORPAY_KEYID=your_razorpay_key_id
```

Start frontend:
```bash
npm run dev
```

### 3. Admin Panel Setup

```bash
cd admin
npm install
```

Create `.env` file in `admin/` directory:
```env
VITE_BACKEND_URL=http://localhost:7060
```

Start admin panel:
```bash
npm run dev
```

## Fixed Issues

### Backend Fixes:
1. ✅ Fixed `process.exit(0)` to `process.exit(1)` in database connection error handler
2. ✅ Fixed HTTP status codes (401 for unauthorized, 403 for forbidden)
3. ✅ Fixed typo "UnAuthorized Accessss" in doctor authentication
4. ✅ Added JWT token expiration to doctor login (1 day)
5. ✅ Improved error messages for better debugging

### Security Improvements:
- JWT tokens with proper expiration
- Argon2 password hashing
- HTTP-only cookies
- CORS configuration
- Rate limiting
- Helmet security headers
- Redis session management

## Running the Application

1. Start MongoDB (if local): `mongod`
2. Start Redis (if local): `redis-server`
3. Start Backend: `cd backend && npm start`
4. Start Frontend: `cd frontend && npm run dev`
5. Start Admin: `cd admin && npm run dev`

## Default Ports
- Backend: http://localhost:7060
- Frontend: http://localhost:5173
- Admin: http://localhost:5174

## Notes
- Make sure MongoDB and Redis are running before starting the backend
- Update all environment variables with your actual credentials
- For production, update CORS origins and set secure: true for cookies
