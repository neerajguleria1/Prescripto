@echo off
echo ========================================
echo Pushing to GitHub Repository
echo ========================================
echo.

echo Step 1: Initializing Git...
git init

echo.
echo Step 2: Adding remote repository...
git remote add origin https://github.com/neerajguleria1/Prescripto.git

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Creating commit...
git commit -m "Enhanced UI with modern design, Docker deployment, and production optimizations"

echo.
echo Step 5: Pushing to GitHub...
git branch -M main
git push -u origin main --force

echo.
echo ========================================
echo Done! Check: https://github.com/neerajguleria1/Prescripto
echo ========================================
pause
