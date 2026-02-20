@echo off
echo ========================================
echo GitHub Repository Setup
echo ========================================
echo.

echo This will initialize Git and push to your repository.
echo.
echo Before running this:
echo 1. Create a Personal Access Token on GitHub
echo 2. Have your repository URL ready
echo.
pause

echo.
echo Initializing Git repository...
git init

echo.
set /p REPO_URL="Enter your GitHub repository URL: "

echo.
echo Adding remote repository...
git remote add origin %REPO_URL%

echo.
echo Adding all files...
git add .

echo.
echo Creating commit...
git commit -m "Enhanced UI with modern design, Docker deployment, and bug fixes"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Done! Check your GitHub repository.
echo ========================================
pause
