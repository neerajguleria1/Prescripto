# GitHub Repository Update Guide

## Option 1: Use GitHub Personal Access Token (Recommended)

### Step 1: Create Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Prescripto Update"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Update Repository
```bash
# Check current remote
git remote -v

# If you see your old repo, update it
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/REPO_NAME.git

# Or add new remote if none exists
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/REPO_NAME.git

# Add all changes
git add .

# Commit changes
git commit -m "Enhanced UI with modern design and Docker deployment"

# Push to GitHub
git push -u origin main
```

---

## Option 2: Use GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository → Select your Prescripto-main folder
4. It will show all changes
5. Write commit message: "Enhanced UI and Docker deployment"
6. Click "Commit to main"
7. Click "Push origin"

---

## Option 3: Reset GitHub Password

1. Go to GitHub.com
2. Click "Forgot password?"
3. Enter your email
4. Follow reset instructions
5. Then use commands from Option 1 (without token in URL)

---

## Quick Commands (After Setting Up)

```bash
# Navigate to project
cd "d:\All work\Prescripto-main"

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "UI improvements and Docker deployment"

# Push
git push origin main
```

---

## If You Don't Remember Repository URL

1. Go to GitHub.com
2. Sign in
3. Click your profile → Your repositories
4. Find your Prescripto repository
5. Copy the URL
6. Use: `git remote set-url origin YOUR_REPO_URL`

---

## Common Issues

### Issue: "fatal: not a git repository"
```bash
cd "d:\All work\Prescripto-main"
git init
git remote add origin YOUR_REPO_URL
git add .
git commit -m "Initial commit with improvements"
git push -u origin main
```

### Issue: "Updates were rejected"
```bash
git pull origin main --rebase
git push origin main
```

### Issue: "Authentication failed"
- Use Personal Access Token instead of password
- Or use GitHub Desktop

---

## What to Do Now

1. **Choose Option 1 or 2** (I recommend Option 2 - GitHub Desktop)
2. **Get your repository URL** from GitHub.com
3. **Follow the steps** above
4. **Push your changes**

Your repository will be updated with all the improvements!
