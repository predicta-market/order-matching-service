# Order Matching Service

Starting application with PM2:
```bash
pm2 start dist/index.js --name "order-matching-service"
```

Build and run the Docker image:

```bash
docker build -t order-matching-service .
docker run -d -p 3000:3000 --env-file .env order-matching-service
```