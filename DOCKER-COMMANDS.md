# 🐳 Docker Quick Reference

## 🚀 Essential Commands

### Start Application
```bash
docker-compose up -d --build
```

### Stop Application
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f              # All services
docker-compose logs -f backend      # Backend only
docker-compose logs -f frontend     # Frontend only
```

### Check Status
```bash
docker-compose ps
docker stats
```

### Restart Services
```bash
docker-compose restart              # All services
docker-compose restart backend      # Backend only
```

---

## 🔧 Maintenance

### Update Application
```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Rebuild Single Service
```bash
docker-compose up -d --build backend
```

### Access Container Shell
```bash
docker exec -it prescripto-backend sh
docker exec -it prescripto-mongodb mongosh
docker exec -it prescripto-redis redis-cli
```

### View Container Logs
```bash
docker logs prescripto-backend -f
docker logs prescripto-frontend -f
```

---

## 💾 Database Operations

### MongoDB
```bash
# Access MongoDB shell
docker exec -it prescripto-mongodb mongosh

# Backup
docker exec prescripto-mongodb mongodump --out /data/backup
docker cp prescripto-mongodb:/data/backup ./backup

# Restore
docker cp ./backup prescripto-mongodb:/data/restore
docker exec prescripto-mongodb mongorestore /data/restore
```

### Redis
```bash
# Access Redis CLI
docker exec -it prescripto-redis redis-cli

# Check keys
docker exec prescripto-redis redis-cli KEYS "*"

# Backup
docker exec prescripto-redis redis-cli SAVE
docker cp prescripto-redis:/data/dump.rdb ./redis-backup.rdb
```

---

## 🧹 Cleanup

### Remove Stopped Containers
```bash
docker-compose down
```

### Remove Volumes (⚠️ Deletes Data)
```bash
docker-compose down -v
```

### Remove Images
```bash
docker-compose down --rmi all
```

### Clean Everything
```bash
docker system prune -af
docker volume prune -f
```

---

## 🔍 Debugging

### Check Container Health
```bash
docker inspect prescripto-backend | grep -A 10 Health
```

### View Resource Usage
```bash
docker stats
```

### Check Networks
```bash
docker network ls
docker network inspect prescripto-network
```

### Check Volumes
```bash
docker volume ls
docker volume inspect prescripto_mongodb_data
```

---

## 🌐 Access URLs

- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3001
- **Backend:** http://localhost:7060
- **Health Checks:**
  - http://localhost:7060/health
  - http://localhost:3000/health
  - http://localhost:3001/health

---

## 📊 Monitoring

### Real-time Logs
```bash
docker-compose logs -f --tail=100
```

### Container Stats
```bash
docker stats --no-stream
```

### Disk Usage
```bash
docker system df
```

---

## 🆘 Troubleshooting

### Container Won't Start
```bash
docker-compose logs <service-name>
docker inspect <container-name>
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :7060
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:7060 | xargs kill -9
```

### Out of Memory
```bash
docker stats
# Increase Docker memory in settings
```

### Network Issues
```bash
docker network prune
docker-compose down
docker-compose up -d
```

---

## 🎯 Makefile Shortcuts

```bash
make build      # Build all images
make up         # Start services
make down       # Stop services
make restart    # Restart services
make logs       # View logs
make clean      # Remove everything
make backup     # Backup databases
make health     # Check health
```

---

## 📝 Environment Variables

### View Current Environment
```bash
docker-compose config
```

### Update Environment
```bash
nano .env
docker-compose down
docker-compose up -d
```

---

## 🔐 Security

### Scan Images for Vulnerabilities
```bash
docker scan prescripto-backend
```

### Update Base Images
```bash
docker-compose pull
docker-compose up -d --build
```

---

## 📦 Image Management

### List Images
```bash
docker images
```

### Remove Unused Images
```bash
docker image prune -a
```

### Tag Image
```bash
docker tag prescripto-backend:latest prescripto-backend:v1.0
```

### Push to Registry
```bash
docker push your-registry/prescripto-backend:latest
```

---

## 🚀 Production Tips

1. **Always use specific versions** in production
2. **Set resource limits** in docker-compose.yml
3. **Enable auto-restart** with `restart: unless-stopped`
4. **Monitor logs** regularly
5. **Backup databases** daily
6. **Update images** monthly
7. **Use secrets** for sensitive data
8. **Enable health checks**
9. **Set up monitoring** (Prometheus, Grafana)
10. **Test rollback** procedures

---

## 📞 Quick Help

**Issue:** Container keeps restarting  
**Fix:** `docker-compose logs <service>` to see error

**Issue:** Can't connect to database  
**Fix:** Check if MongoDB container is healthy

**Issue:** Changes not reflecting  
**Fix:** Rebuild with `docker-compose up -d --build`

**Issue:** Out of disk space  
**Fix:** `docker system prune -af`

---

**For detailed help, see:** `DOCKER-DEPLOYMENT.md`
