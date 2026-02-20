# Docker Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+
- 2GB+ RAM available
- 10GB+ disk space

### Local Development with Docker

1. **Copy environment file:**
```bash
cp .env.docker .env
```

2. **Update credentials in `.env`:**
   - Change all passwords
   - Add Cloudinary credentials
   - Add Razorpay credentials
   - Set JWT_SECRET (32+ characters)

3. **Build and start all services:**
```bash
docker-compose up -d --build
```

4. **Check service health:**
```bash
docker-compose ps
```

5. **View logs:**
```bash
docker-compose logs -f
```

### Access URLs
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3001
- **Backend API:** http://localhost:7060
- **Health Check:** http://localhost:7060/health

---

## 🏭 Production Deployment

### Option 1: Single Server (VPS/EC2)

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

#### 2. Deploy Application
```bash
# Clone repository
git clone <your-repo-url>
cd Prescripto-main

# Create production .env
cp .env.docker .env
nano .env  # Update all values

# Start services
docker-compose up -d --build

# Enable auto-restart
docker-compose restart
```

#### 3. Setup Nginx Reverse Proxy
```bash
sudo apt install nginx certbot python3-certbot-nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/prescripto
```

**Nginx Configuration:**
```nginx
# Frontend
server {
    listen 80;
    server_name prescripto.com www.prescripto.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin Panel
server {
    listen 80;
    server_name admin.prescripto.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 80;
    server_name api.prescripto.com;

    location / {
        proxy_pass http://localhost:7060;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Credentials true always;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/prescripto /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL
sudo certbot --nginx -d prescripto.com -d www.prescripto.com
sudo certbot --nginx -d admin.prescripto.com
sudo certbot --nginx -d api.prescripto.com
```

#### 4. Update Environment Variables
```bash
nano .env
```

Update URLs:
```env
FRONTEND_URL=https://prescripto.com
ADMIN_URL=https://admin.prescripto.com
VITE_BACKEND_URL=https://api.prescripto.com
```

```bash
# Rebuild with new URLs
docker-compose down
docker-compose up -d --build
```

---

### Option 2: AWS ECS/Fargate

#### 1. Push Images to ECR
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag images
docker build -t prescripto-backend ./backend
docker tag prescripto-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/prescripto-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/prescripto-backend:latest

# Repeat for frontend and admin
```

#### 2. Create ECS Task Definitions
- Use AWS Console or Terraform
- Set environment variables from Secrets Manager
- Configure health checks
- Set up Application Load Balancer

---

### Option 3: Kubernetes (GKE/EKS/AKS)

See `k8s/` directory for Kubernetes manifests (to be created).

---

## 🔧 Maintenance Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart backend
```

### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Backup Database
```bash
# MongoDB backup
docker exec prescripto-mongodb mongodump --out /data/backup
docker cp prescripto-mongodb:/data/backup ./backup-$(date +%Y%m%d)

# Redis backup
docker exec prescripto-redis redis-cli --rdb /data/dump.rdb SAVE
docker cp prescripto-redis:/data/dump.rdb ./redis-backup-$(date +%Y%m%d).rdb
```

### Restore Database
```bash
# MongoDB restore
docker cp ./backup prescripto-mongodb:/data/restore
docker exec prescripto-mongodb mongorestore /data/restore
```

### Clean Up
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

---

## 📊 Monitoring

### Health Checks
```bash
# Backend
curl http://localhost:7060/health

# Frontend
curl http://localhost:3000/health

# Admin
curl http://localhost:3001/health
```

### Resource Usage
```bash
docker stats
```

### Container Status
```bash
docker-compose ps
```

---

## 🔒 Security Checklist

- [ ] Change all default passwords in `.env`
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable SSL/TLS certificates
- [ ] Configure firewall (UFW/Security Groups)
- [ ] Set up MongoDB authentication
- [ ] Enable Redis password
- [ ] Use secrets management (AWS Secrets Manager, HashiCorp Vault)
- [ ] Regular security updates
- [ ] Enable Docker security scanning
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerts

---

## 🚨 Troubleshooting

### Container won't start
```bash
docker-compose logs <service-name>
docker inspect <container-name>
```

### Database connection issues
```bash
# Check MongoDB
docker exec -it prescripto-mongodb mongosh

# Check Redis
docker exec -it prescripto-redis redis-cli ping
```

### Port conflicts
```bash
# Check port usage
sudo netstat -tulpn | grep <port>

# Change ports in docker-compose.yml
```

### Out of memory
```bash
# Check memory usage
docker stats

# Increase Docker memory limit
# Docker Desktop: Settings > Resources > Memory
```

---

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale backend instances
docker-compose up -d --scale backend=3

# Requires load balancer configuration
```

### Vertical Scaling
- Increase container resources in docker-compose.yml
- Add resource limits and reservations

---

## 🔄 CI/CD Integration

See `.github/workflows/deploy.yml` for GitHub Actions setup.

---

## 📞 Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify environment variables
3. Check service health endpoints
4. Review TROUBLESHOOTING.md
