# Production Optimization & Deployment Checklist

## ✅ Pre-Deployment Checklist

### Security
- [ ] Change all default passwords in `.env`
- [ ] JWT_SECRET is 32+ characters and randomly generated
- [ ] MongoDB has authentication enabled
- [ ] Redis has password protection
- [ ] SSL/TLS certificates configured
- [ ] CORS origins restricted to production domains
- [ ] Rate limiting configured appropriately
- [ ] Security headers enabled (Helmet)
- [ ] Secrets stored in environment variables (not hardcoded)
- [ ] `.env` files added to `.gitignore`

### Database
- [ ] MongoDB indexes created for frequently queried fields
- [ ] Database backup strategy implemented
- [ ] Connection pooling configured
- [ ] MongoDB Atlas or managed service for production
- [ ] Redis persistence enabled (AOF or RDB)

### Application
- [ ] Health check endpoints working
- [ ] Error logging configured (Winston/Sentry)
- [ ] Environment variables validated on startup
- [ ] Graceful shutdown handlers implemented
- [ ] File upload size limits set
- [ ] API rate limiting tested
- [ ] CORS configured for production domains

### Docker
- [ ] Multi-stage builds used
- [ ] Non-root user in containers
- [ ] Health checks configured
- [ ] Resource limits set (CPU/Memory)
- [ ] Volumes for persistent data
- [ ] Networks isolated
- [ ] Images scanned for vulnerabilities

### Monitoring
- [ ] Application logs centralized
- [ ] Health check monitoring setup
- [ ] Resource usage monitoring (CPU, Memory, Disk)
- [ ] Error tracking (Sentry, Rollbar)
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Performance monitoring (New Relic, DataDog)

### Performance
- [ ] Frontend assets minified and compressed
- [ ] Images optimized (Cloudinary)
- [ ] Redis caching implemented
- [ ] Database queries optimized
- [ ] CDN configured for static assets
- [ ] Gzip compression enabled
- [ ] Browser caching headers set

---

## 🚀 Deployment Steps

### 1. Prepare Environment
```bash
# Copy and configure environment
cp .env.docker .env
nano .env  # Update all production values
```

### 2. Build Images
```bash
docker-compose build --no-cache
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Verify Health
```bash
docker-compose ps
curl http://localhost:7060/health
curl http://localhost:3000/health
curl http://localhost:3001/health
```

### 5. Check Logs
```bash
docker-compose logs -f
```

---

## 🔧 Performance Optimizations

### Backend Optimizations

#### 1. Add MongoDB Indexes
```javascript
// In models, add indexes
UserSchema.index({ email: 1 });
DoctorSchema.index({ email: 1, available: 1 });
AppointmentSchema.index({ userID: 1, docID: 1, slotDate: 1 });
```

#### 2. Connection Pooling
```javascript
// In dbConnect.js
mongoose.connect(process.env.MONGODB_URL, {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

#### 3. Redis Optimization
```javascript
// Set appropriate TTL for cached data
await setValue(cachedKey, allDoctors, 3600); // 1 hour
```

#### 4. Compression Middleware
```javascript
import compression from 'compression';
app.use(compression());
```

### Frontend Optimizations

#### 1. Code Splitting
```javascript
// Use React.lazy for route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

#### 2. Image Optimization
- Use WebP format
- Lazy load images
- Implement responsive images

#### 3. Bundle Analysis
```bash
npm run build -- --analyze
```

### Database Optimizations

#### 1. Create Indexes
```javascript
db.users.createIndex({ email: 1 }, { unique: true });
db.doctors.createIndex({ speciality: 1, available: 1 });
db.appointments.createIndex({ userID: 1, slotDate: 1 });
```

#### 2. Query Optimization
```javascript
// Use projection to limit fields
const users = await UserModel.find({}).select('name email').lean();
```

---

## 📊 Monitoring Setup

### 1. Application Monitoring (PM2 Alternative)
```bash
# For non-Docker deployments
npm install -g pm2
pm2 start server.js --name prescripto-backend
pm2 startup
pm2 save
```

### 2. Log Management
```javascript
// Install Winston
npm install winston

// Configure in backend
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

### 3. Error Tracking (Sentry)
```javascript
// Install Sentry
npm install @sentry/node

// Configure
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## 🔒 Security Hardening

### 1. Environment Variables Validation
```javascript
// Add at startup
const requiredEnvVars = [
  'MONGODB_URL', 'JWT_SECRET', 'REDIS_PASSWORD',
  'CLOUDINARY_NAME', 'RAZORPAY_KEYID'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

### 2. Rate Limiting by Route
```javascript
const strictLimiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 requests per 15 minutes
});

app.post('/api/user/login', strictLimiter, login);
```

### 3. Input Sanitization
```javascript
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize());
```

---

## 📈 Scaling Strategies

### Horizontal Scaling
```yaml
# docker-compose.yml
services:
  backend:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Load Balancing
```nginx
upstream backend {
    least_conn;
    server backend1:7060;
    server backend2:7060;
    server backend3:7060;
}
```

### Database Scaling
- MongoDB Replica Set
- Redis Cluster
- Read replicas for heavy read operations

---

## 🔄 CI/CD Pipeline

### GitHub Actions Secrets Required
- `SERVER_HOST` - Production server IP
- `SERVER_USER` - SSH username
- `SSH_PRIVATE_KEY` - SSH private key
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password

### Deployment Workflow
1. Push to main branch
2. Run tests
3. Build Docker images
4. Push to registry
5. SSH to server
6. Pull latest images
7. Restart containers
8. Run health checks

---

## 🆘 Rollback Strategy

### Quick Rollback
```bash
# Tag current version before deployment
docker tag prescripto-backend:latest prescripto-backend:backup

# If issues occur, rollback
docker-compose down
docker tag prescripto-backend:backup prescripto-backend:latest
docker-compose up -d
```

### Database Rollback
```bash
# Restore from backup
make restore
```

---

## 📞 Production Support

### Health Check Endpoints
- Backend: `GET /health`
- Frontend: `GET /health`
- Admin: `GET /health`

### Log Locations
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f admin

# System logs
journalctl -u docker -f
```

### Emergency Contacts
- DevOps Team: [contact]
- Database Admin: [contact]
- Security Team: [contact]

---

## 🎯 Performance Targets

- API Response Time: < 200ms (p95)
- Page Load Time: < 2s
- Database Query Time: < 50ms
- Uptime: 99.9%
- Error Rate: < 0.1%

---

## 📝 Post-Deployment

- [ ] Verify all services are running
- [ ] Test critical user flows
- [ ] Monitor error rates
- [ ] Check resource usage
- [ ] Verify backups are running
- [ ] Update documentation
- [ ] Notify team of deployment
