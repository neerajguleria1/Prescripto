# Prescripto - Quick Reference Card

## 🚀 Quick Start (Windows)
```bash
# Option 1: Run setup script
setup.bat

# Option 2: Manual setup
npm run install-all
npm start
```

## 📁 Project Structure
```
Prescripto-main/
├── backend/          # Express.js API
├── frontend/         # React user app
├── admin/            # React admin panel
├── .env.example      # Environment templates
└── setup.bat         # Quick setup script
```

## 🔧 Essential Commands

### Installation
```bash
npm run install-all   # Install all dependencies
```

### Development
```bash
npm start            # Start all services
npm run backend      # Backend only (port 7060)
npm run frontend     # Frontend only (port 5173)
npm run admin        # Admin only (port 5174)
```

## 🌐 Default URLs
- **Backend API:** http://localhost:7060
- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5174

## 🔑 Environment Setup Priority

### 1️⃣ Backend (.env) - REQUIRED
```env
PORT=7060
MONGODB_URL=mongodb://localhost:27017/prescripto
JWT_SECRET=min_32_characters_long_secret_key
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSSWORD=your_password
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### 2️⃣ Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:7060
```

### 3️⃣ Admin (.env)
```env
VITE_BACKEND_URL=http://localhost:7060
```

## 🗄️ Required Services

### MongoDB
```bash
# Start: mongod
# Check: mongo --eval "db.version()"
```

### Redis
```bash
# Start: redis-server
# Check: redis-cli ping
```

## 🔐 Default Login Credentials

### Admin Panel
- Email: Set in `ADMIN_EMAIL`
- Password: Set in `ADMIN_PASSSWORD`

### User/Doctor
- Register through the application

## 🐛 Quick Troubleshooting

### Backend won't start?
1. Check MongoDB is running
2. Check Redis is running
3. Verify .env file exists
4. Check port 7060 is free

### CORS errors?
1. Verify FRONTEND_URL in backend/.env
2. Verify ADMIN_URL in backend/.env
3. Restart backend after changes

### Login issues?
1. Clear browser cookies
2. Check JWT_SECRET length (32+ chars)
3. Verify credentials in .env

### Database errors?
1. Check MONGODB_URL
2. Ensure MongoDB is running
3. Check database permissions

## 📊 API Endpoints

### User Routes (`/api/user`)
- POST `/register` - User registration
- POST `/login` - User login
- POST `/logout` - User logout
- GET `/getuser` - Get user profile
- POST `/book-appointment` - Book appointment
- POST `/cancel-appointment` - Cancel appointment
- POST `/payment-razorpay` - Initiate payment

### Doctor Routes (`/api/doctor`)
- POST `/doctor-login` - Doctor login
- GET `/all-doctors` - Get all doctors
- GET `/doctor-appointment` - Get appointments
- POST `/doctor-appointment-complete` - Mark complete

### Admin Routes (`/api/admin`)
- POST `/admin-login` - Admin login
- POST `/add-doctor` - Add new doctor
- GET `/all-doctors` - Get all doctors
- GET `/display-appointments` - View appointments
- GET `/dashboard` - Dashboard stats

## 🔒 Security Features
- ✅ Argon2 password hashing
- ✅ JWT with refresh tokens
- ✅ HTTP-only cookies
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min)
- ✅ Helmet security headers
- ✅ Redis session management

## 📦 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Redis (caching)
- JWT (auth)
- Argon2 (hashing)
- Cloudinary (images)
- Razorpay (payments)

### Frontend/Admin
- React 19
- Vite
- TailwindCSS
- Axios
- React Router

## 🎯 Key Features
- Role-based access (Admin/Doctor/Patient)
- Real-time appointment booking
- Payment integration (Razorpay + COD)
- Image upload (Cloudinary)
- Session management (Redis)
- Secure authentication (JWT)

## 📝 Important Notes
1. JWT_SECRET must be 32+ characters
2. ADMIN_PASSSWORD has 3 S's (typo kept for compatibility)
3. Clear cookies after logout
4. Redis required for sessions
5. MongoDB required for data storage

## 🆘 Need Help?
1. Read `SETUP.md` for detailed setup
2. Check `TROUBLESHOOTING.md` for common issues
3. Review `FIXES.md` for bug fixes
4. Check Code Issues Panel in IDE

## ✅ Pre-Launch Checklist
- [ ] MongoDB running
- [ ] Redis running
- [ ] All .env files created
- [ ] Dependencies installed
- [ ] Backend starts successfully
- [ ] Frontend loads
- [ ] Admin panel loads
- [ ] Can register user
- [ ] Can login
- [ ] Can book appointment

---
**Ready to go! Run `npm start` to launch all services.**
