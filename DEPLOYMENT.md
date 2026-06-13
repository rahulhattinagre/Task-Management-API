# 📦 Deployment Guide - Task Management System

This guide covers deploying the Task Management System to production environments.

## Table of Contents
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Migration](#database-migration)
- [Environment Configuration](#environment-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Backend Deployment

### Option 1: Heroku Deployment

#### Prerequisites
- Heroku CLI installed
- Heroku account
- ClearDB MySQL add-on

#### Steps

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Add MySQL Add-on**
   ```bash
   heroku addons:create cleardb:ignite
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set app.jwt-secret=your_secret_key
   heroku config:set app.jwt-expiration-milliseconds=86400000
   ```

5. **Deploy Application**
   ```bash
   git push heroku main
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Option 2: AWS EC2 Deployment

#### Prerequisites
- AWS account with EC2 access
- PuTTY or SSH client

#### Steps

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 LTS
   - Create security group with ports 8080, 3306, 80, 443 open

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Java 21**
   ```bash
   sudo apt update
   sudo apt install openjdk-21-jdk
   java -version
   ```

4. **Install MySQL**
   ```bash
   sudo apt install mysql-server
   sudo mysql_secure_installation
   ```

5. **Create Database**
   ```bash
   sudo mysql -u root -p
   CREATE DATABASE task_management_db;
   EXIT;
   ```

6. **Deploy Backend**
   ```bash
   # Upload JAR file via SCP or use GitHub
   scp -i your-key.pem target/task-manager-0.0.1-SNAPSHOT.jar ubuntu@your-instance-ip:/home/ubuntu/
   
   # Run application
   java -Dspring.datasource.url=jdbc:mysql://localhost:3306/task_management_db \
        -Dspring.datasource.username=root \
        -Dspring.datasource.password=your_password \
        -jar task-manager-0.0.1-SNAPSHOT.jar
   ```

7. **Setup as Service (Optional)**
   ```bash
   sudo nano /etc/systemd/system/taskmanager.service
   ```
   
   Add content:
   ```
   [Unit]
   Description=Task Manager Application
   After=syslog.target network-online.target remote-fs.target nss-lookup.target
   Wants=network-online.target
   
   [Service]
   Type=simple
   User=ubuntu
   WorkingDirectory=/home/ubuntu
   ExecStart=/usr/bin/java -jar /home/ubuntu/task-manager-0.0.1-SNAPSHOT.jar
   Restart=on-failure
   RestartSec=10
   
   [Install]
   WantedBy=multi-user.target
   ```
   
   Enable service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable taskmanager
   sudo systemctl start taskmanager
   ```

### Option 3: Docker Deployment

#### Create Dockerfile

Create `Dockerfile` in backend root:
```dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/task-manager-0.0.1-SNAPSHOT.jar task-manager.jar

ENTRYPOINT ["java","-jar","task-manager.jar"]

EXPOSE 8080
```

#### Build and Run

```bash
# Build Docker image
docker build -t task-manager-backend .

# Run container
docker run -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/task_management_db \
           -e SPRING_DATASOURCE_USERNAME=root \
           -e SPRING_DATASOURCE_PASSWORD=password \
           -p 8080:8080 \
           task-manager-backend
```

#### Docker Compose (with MySQL)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: task_management_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/task_management_db?useSSL=false&serverTimezone=UTC
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: password
    depends_on:
      - mysql

volumes:
  mysql_data:
```

Run:
```bash
docker-compose up -d
```

## Frontend Deployment

### Option 1: Vercel Deployment

#### Prerequisites
- Vercel account
- GitHub account

#### Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit vercel.com
   - Click "New Project"
   - Select your repository
   - Configure build settings

3. **Set Environment Variables**
   - Add `VITE_API_URL=your_backend_url`

4. **Deploy**
   - Vercel will automatically build and deploy

### Option 2: Netlify Deployment

#### Steps

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Option 3: AWS S3 + CloudFront

#### Steps

1. **Build Frontend**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Create S3 bucket for static hosting
   - Enable static website hosting

3. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

4. **Create CloudFront Distribution**
   - Configure CloudFront to serve S3 content
   - Set up SSL certificate

### Option 4: Docker Deployment

Create `Dockerfile` in frontend root:
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
  
  location /api/ {
    proxy_pass http://backend-api:8080/api/;
  }
}
```

Build and run:
```bash
docker build -t task-manager-frontend .
docker run -p 80:80 task-manager-frontend
```

## Database Migration

### Backup Existing Database

```bash
# MySQL Backup
mysqldump -u root -p task_management_db > backup.sql

# Restore
mysql -u root -p task_management_db < backup.sql
```

### Migration Steps

1. **Export Data from Old Database** (if applicable)
   ```bash
   mysqldump -u old_user -p old_database > migration.sql
   ```

2. **Create New Database**
   ```bash
   CREATE DATABASE task_management_db_prod;
   ```

3. **Import Data**
   ```bash
   mysql -u root -p task_management_db_prod < migration.sql
   ```

4. **Update Connection Strings**
   - Update application.properties with new database credentials

## Environment Configuration

### Production application.properties

```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database - Use environment variables or secrets
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false

# JWT
app.jwt-secret=${JWT_SECRET}
app.jwt-expiration-milliseconds=${JWT_EXPIRATION}

# Logging
logging.level.root=WARN
logging.level.com.taskmanager=INFO

# Actuator
management.endpoints.web.exposure.include=health,metrics
```

### Production .env.local (Frontend)

```
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Task Manager
```

## Monitoring & Maintenance

### Logging Setup

1. **Centralized Logging with ELK Stack**
   ```yaml
   logging:
     level:
       root: INFO
       com.taskmanager: DEBUG
     file:
       name: logs/application.log
       max-size: 10MB
       max-history: 30
   ```

2. **Monitor Performance**
   - Use Spring Boot Actuator
   - Monitor database queries
   - Track API response times

### Health Checks

```bash
# Liveness probe
curl http://localhost:8080/actuator/health

# Metrics
curl http://localhost:8080/actuator/metrics
```

### Database Maintenance

```bash
# Optimize tables
OPTIMIZE TABLE users;
OPTIMIZE TABLE tasks;

# Check for errors
CHECK TABLE users;
CHECK TABLE tasks;

# Backup schedule (daily)
0 2 * * * mysqldump -u root -ppassword task_management_db > /backups/db_$(date +\%Y\%m\%d).sql
```

### SSL/TLS Configuration

#### Nginx (Reverse Proxy)

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    location / {
        proxy_pass http://localhost:8080;
    }
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## Scaling Considerations

### Horizontal Scaling
1. Deploy multiple backend instances
2. Use load balancer (NGINX, HAProxy, AWS ELB)
3. Use connection pooling for database

### Caching
1. Implement Redis for session storage
2. Cache frequently accessed data
3. Set appropriate TTLs

### Database Optimization
1. Add appropriate indexes
2. Archive old data
3. Use read replicas for scaling reads

## Security Checklist

- [ ] Update JWT secret key
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set strong database password
- [ ] Enable firewall rules
- [ ] Regular security patches
- [ ] Enable audit logging
- [ ] Setup rate limiting
- [ ] Regular backups
- [ ] Monitor suspicious activities

## Rollback Procedure

1. Keep backup of previous version
2. Database rollback if needed
3. Revert application deployment
4. Update DNS if needed (for frontend)

## Support & Monitoring

- Setup error tracking (Sentry, DataDog)
- Configure alerts for critical issues
- Monitor resource usage (CPU, Memory, Disk)
- Regular security audits

---

**For questions or issues, refer to the main README.md**
