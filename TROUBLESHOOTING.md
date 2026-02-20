# Troubleshooting Guide

## Common Issues & Solutions

### 1. MongoDB Connection Failed
**Error:** `Database Connection Failed!`

**Solutions:**
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify MONGODB_URL in backend/.env
- Check if port 27017 is available
- For MongoDB Atlas, check network access and credentials

### 2. Redis Connection Error
**Error:** `Redis Client Error`

**Solutions:**
- Start Redis server: `redis-server`
- Verify Redis credentials in backend/.env
- Check REDIS_HOST and REDIS_PORT
- For cloud Redis, verify password and connection string

### 3. CORS Error
**Error:** `Not allowed by CORS`

**Solutions:**
- Verify FRONTEND_URL and ADMIN_URL in backend/.env
- Ensure URLs match exactly (including port)
- Check if backend is running on correct port

### 4. JWT Token Errors
**Error:** `Invalid or expired token`

**Solutions:**
- Clear browser cookies
- Logout and login again
- Verify JWT_SECRET is at least 32 characters
- Check token expiration settings

### 5. Cloudinary Upload Failed
**Error:** Image upload errors

**Solutions:**
- Verify Cloudinary credentials in backend/.env
- Check CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- Ensure file size is within limits

### 6. Razorpay Payment Issues
**Error:** Payment initialization failed

**Solutions:**
- Verify RAZORPAY_KEYID and RAZORPAY_KEY_SECRET
- Check if test/live mode matches your keys
- Ensure CURRENCY is set correctly (INR, USD, etc.)

### 7. Port Already in Use
**Error:** `Port 7060 is already in use`

**Solutions:**
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :7060
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:7060 | xargs kill -9
  ```
- Or change PORT in backend/.env

### 8. Module Not Found
**Error:** `Cannot find module`

**Solutions:**
- Run `npm install` in respective directory
- Delete node_modules and package-lock.json, then reinstall
- Check Node.js version (v16+ required)

### 9. Environment Variables Not Loading
**Error:** `undefined` for process.env variables

**Solutions:**
- Ensure .env file exists in correct directory
- Check .env file has no spaces around = sign
- Restart the server after changing .env
- Verify dotenv is imported in server.js

### 10. Admin Login Failed
**Error:** `Invalid Credentials`

**Solutions:**
- Verify ADMIN_EMAIL and ADMIN_PASSSWORD in backend/.env
- Note: There's a typo in env variable name (PASSSWORD with 3 S's)
- Clear admin cookies and try again

## Development Tips

### Check if services are running:
```bash
# MongoDB
mongo --eval "db.version()"

# Redis
redis-cli ping

# Backend
curl http://localhost:7060/api/doctor/all-doctors
```

### Clear all cookies (Browser Console):
```javascript
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```

### Reset MongoDB database:
```bash
mongo
use prescripto
db.dropDatabase()
```

### View Redis keys:
```bash
redis-cli
KEYS *
GET users:<key>
```

## Still Having Issues?

1. Check browser console for errors
2. Check backend terminal for error logs
3. Verify all environment variables are set
4. Ensure MongoDB and Redis are running
5. Try clearing cache and cookies
6. Restart all services

## Logs Location
- Backend logs: Terminal where `npm start` was run
- Frontend logs: Browser console (F12)
- MongoDB logs: Check MongoDB log directory
- Redis logs: Check Redis log directory
