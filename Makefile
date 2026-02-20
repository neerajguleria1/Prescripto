.PHONY: help build up down restart logs clean backup restore

help:
	@echo "Prescripto Docker Commands:"
	@echo "  make build     - Build all Docker images"
	@echo "  make up        - Start all services"
	@echo "  make down      - Stop all services"
	@echo "  make restart   - Restart all services"
	@echo "  make logs      - View logs (all services)"
	@echo "  make clean     - Remove containers and images"
	@echo "  make backup    - Backup MongoDB and Redis"
	@echo "  make restore   - Restore from backup"
	@echo "  make health    - Check service health"

build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

clean:
	docker-compose down -v --rmi all

backup:
	@mkdir -p backups
	docker exec prescripto-mongodb mongodump --out /data/backup
	docker cp prescripto-mongodb:/data/backup ./backups/mongodb-$$(date +%Y%m%d-%H%M%S)
	docker exec prescripto-redis redis-cli --rdb /data/dump.rdb SAVE
	docker cp prescripto-redis:/data/dump.rdb ./backups/redis-$$(date +%Y%m%d-%H%M%S).rdb
	@echo "Backup completed in ./backups/"

restore:
	@echo "Restoring from latest backup..."
	@LATEST=$$(ls -t backups/mongodb-* | head -1); \
	docker cp $$LATEST prescripto-mongodb:/data/restore; \
	docker exec prescripto-mongodb mongorestore /data/restore

health:
	@echo "Checking service health..."
	@curl -s http://localhost:7060/health || echo "Backend: DOWN"
	@curl -s http://localhost:3000/health || echo "Frontend: DOWN"
	@curl -s http://localhost:3001/health || echo "Admin: DOWN"
