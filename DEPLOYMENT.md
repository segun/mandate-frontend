# MANDATE Frontend Deployment Guide

## Overview

This guide covers deploying the MANDATE Frontend to a production server using **static file deployment**. The deployment structure is:
- **`/` route**: Static website from `website/` folder → served from `/var/www/html/`
- **`/app` route**: Vite React SPA from `dist/` → served from `/var/www/html/app/`

Both are served as static files by Nginx for optimal performance and reliability.

## Prerequisites

- Node.js v22+ and Yarn installed (via NVM)
- Nginx web server
- PM2 installed globally
- Backend API running and accessible

## Deployment Steps

### 1. Clone the Frontend Repository

```bash
cd ~
git clone git@github.com:segun/mandate-frontend.git
cd mandate-frontend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
nano .env
```

Edit `.env` with your production values:
```env
VITE_API_URL=https://your-api-domain.com/api
# or for local backend:
VITE_API_URL=http://localhost:3000/api
```

### 4. Build the Frontend

```bash
yarn build
```

This creates a `dist/` directory with optimized production files for the React app.

### 5. Deploy Both Website and App to Nginx

```bash
# Copy website (root /) to /var/www/html
sudo cp -r website/* /var/www/html/

# Create app directory and copy built frontend
sudo mkdir -p /var/www/html/app
sudo cp -r dist/* /var/www/html/app/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

### 6. Configure Nginx

Copy the Nginx configuration template:

```bash
sudo cp website/nginx.conf /etc/nginx/sites-available/mandate-frontend
sudo ln -s /etc/nginx/sites-available/mandate-frontend /etc/nginx/sites-enabled/
```

Edit the configuration and replace `your-domain.com`:

```bash
sudo nano /etc/nginx/sites-available/mandate-frontend
```

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 7. (Optional) Set Up SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx -d your-domain.com -d www.your-domain.com
```

Then uncomment the SSL sections in the Nginx configuration.

## Development Deployment (Optional)

For testing the Vite development server on the production server:

### 1. Start Development Server with PM2

```bash
pm2 start ecosystem.config.js --env development
pm2 save
```

The frontend will be available at `http://your-server-ip:5173`

### 2. Monitor the Process

```bash
pm2 monit
pm2 logs mandate-frontend-dev
```

### 3. Stop Development Server

```bash
pm2 stop mandate-frontend-dev
pm2 delete mandate-frontend-dev
```

## Updating Production Deployment

### Automated Updates with PM2 Deploy

```bash
pm2 deploy ecosystem.config.js production
```

### Manual Updates

```bash
cd ~/mandate-frontend
git pull origin master
yarn install
yarn build

# Deploy both website and app
sudo rm -rf /var/www/html/app
sudo mkdir -p /var/www/html/app
sudo cp -r website/* /var/www/html/
sudo cp -r dist/* /var/www/html/app/
sudo chown -R www-data:www-data /var/www/html
```

## Troubleshooting

### Nginx not serving the frontend

1. Check Nginx configuration:
   ```bash
   sudo nginx -t
   ```

2. Check file permissions:
   ```bash
   ls -la /var/www/html
   ```

3. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/mandate-frontend-error.log
   ```

### API requests failing

1. Verify backend is running:
   ```bash
   curl http://your-backend-url:3000/api/health
   ```

2. Check VITE_API_URL in `.env`:
   ```bash
   cat .env | grep VITE_API_URL
   ```

3. Check browser console for CORS errors and ensure backend allows requests from frontend origin

### Build failing

```bash
rm -rf node_modules dist
yarn install
yarn build
```

## Performance Optimization

### Enable Gzip Compression

The Nginx configuration includes gzip compression. Verify it's enabled:

```bash
sudo nginx -t
```

### Cache Busting

Static assets have `.js` and `.css` in filename (via Vite), enabling aggressive caching:
- CSS/JS files: 1 year cache
- HTML files: No cache (always fresh)

## Security

- Environment variables are not exposed to the browser (only `VITE_*` prefix is available)
- Sensitive API URLs are secure and not visible in client code
- Nginx configuration includes security headers
- Denies access to hidden files and backup files

## Monitoring

Monitor the static files:

```bash
# Check web root size
du -sh /var/www/html

# Monitor Nginx
systemctl status nginx
tail -f /var/log/nginx/mandate-frontend-access.log
tail -f /var/log/nginx/mandate-frontend-error.log
```

## Rollback

If you need to rollback to a previous version:

```bash
cd ~/mandate-frontend
git log --oneline  # Find the commit hash
git checkout <commit-hash>
yarn build
sudo cp -r dist/* /var/www/html/
```

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
