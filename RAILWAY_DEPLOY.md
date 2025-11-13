# Deploy Backend to Railway

## Step-by-Step Guide

### 1. Sign Up / Login to Railway
- Go to [railway.app](https://railway.app)
- Sign up with GitHub (recommended) or email

### 2. Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub repo"** (recommended) OR **"Empty Project"**

### 3. If Using GitHub:
- Connect your GitHub account if not already connected
- Select the repository: `suraj-bhatt1217/Digital-Wallet`
- Railway will auto-detect it's a Node.js project

### 4. Configure the Service
- Railway should auto-detect the backend folder
- If not, set **Root Directory** to: `backend`
- Railway will automatically:
  - Detect Node.js
  - Run `npm install`
  - Run `npm start` (uses the "start" script from package.json)

### 5. Add PostgreSQL Database
- In your Railway project, click **"+ New"**
- Select **"Database"** → **"Add PostgreSQL"**
- Railway will create a PostgreSQL database
- **Copy the connection details** (you'll need them)

### 6. Set Environment Variables
Click on your service → **Variables** tab → Add these:

```
PORT=3001
NODE_ENV=production

# Database (from Railway PostgreSQL service)
DB_HOST=<your-railway-db-host>
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=<your-railway-db-password>

# JWT Secret (generate a random string)
JWT_SECRET=<your-random-secret-key-here>
JWT_EXPIRES_IN=7d

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Redis is OPTIONAL - leave these empty to run without Redis
# REDIS_HOST=
# REDIS_PORT=
# REDIS_PASSWORD=
```

**To get database credentials:**
- Click on your PostgreSQL service
- Go to **"Variables"** tab
- Copy: `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

### 7. Run Database Migrations
After deployment, you need to run migrations:

**Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
cd backend
railway run npm run migrate
```

**Option B: Using Railway Dashboard**
- Go to your service
- Click **"Deployments"** → **"View Logs"**
- Or use **"Shell"** tab to run commands

**Option C: Add migration to startup (temporary)**
You can temporarily modify the start script, but this is not recommended for production.

### 8. Get Your Backend URL
- After deployment, Railway will give you a URL like: `https://your-app.railway.app`
- Your API will be at: `https://your-app.railway.app/api`
- Copy this URL - you'll need it for the frontend!

### 9. Test Your Backend
- Health check: `https://your-app.railway.app/health`
- Should return: `{"success":true,"message":"Digital Wallet API is running",...}`

### 10. Update Frontend Environment Variable
- Go back to Vercel
- Add/Update: `VITE_API_BASE_URL=https://your-app.railway.app/api`

## Troubleshooting

### Database Connection Issues
- Make sure you're using the Railway PostgreSQL credentials (not Neon)
- Check that SSL is enabled (Railway PostgreSQL requires SSL)
- The database.js file already handles SSL for cloud databases

### Port Issues
- Railway automatically sets `PORT` environment variable
- Your app uses `process.env.PORT || 3001` so it should work automatically

### Migration Issues
- Make sure database is fully provisioned before running migrations
- Check database connection in Railway logs

## Quick Checklist
- [ ] Project created on Railway
- [ ] PostgreSQL database added
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Backend URL copied
- [ ] Frontend environment variable updated

