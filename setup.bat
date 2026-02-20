@echo off
echo ========================================
echo Prescripto - Quick Setup Script
echo ========================================
echo.

echo Step 1: Installing root dependencies...
call npm install
echo.

echo Step 2: Installing backend dependencies...
cd backend
call npm install
cd ..
echo.

echo Step 3: Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.

echo Step 4: Installing admin dependencies...
cd admin
call npm install
cd ..
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo IMPORTANT: Before running the application:
echo 1. Create .env files in backend, frontend, and admin folders
echo 2. Copy from .env.example files and fill in your credentials
echo 3. Make sure MongoDB and Redis are running
echo.
echo To start all services: npm start
echo To start individually:
echo   - Backend: npm run backend
echo   - Frontend: npm run frontend
echo   - Admin: npm run admin
echo.
pause
