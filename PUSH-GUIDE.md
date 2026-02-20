# Quick Push Guide

## Step 1: Get Personal Access Token

1. Click your profile picture (top right) → Settings
2. Scroll down left sidebar → Click "Developer settings" (at bottom)
3. Click "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token (classic)"
5. Name: "Prescripto"
6. Check: ☑️ repo
7. Click "Generate token" (bottom)
8. **COPY THE TOKEN** (save it somewhere!)

## Step 2: Push Your Code

Open Command Prompt in your project folder and run:

```bash
cd "d:\All work\Prescripto-main"

git init
git remote add origin https://github.com/neerajguleria1/Prescripto.git
git add .
git commit -m "Enhanced UI and Docker deployment"
git branch -M main
git push -u origin main --force
```

When asked:
- Username: neerajguleria1
- Password: [PASTE YOUR TOKEN]

Done! ✅

## OR Use GitHub Desktop (Easier):
1. Download: https://desktop.github.com/
2. Sign in
3. File → Add Local Repository
4. Select: d:\All work\Prescripto-main
5. Click "Publish repository"
