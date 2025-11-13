# Local Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **PostgreSQL** - [Download](https://www.postgresql.org/download/)
   - Or use a cloud database like [Neon](https://neon.tech) or [Supabase](https://supabase.com)

## Step 1: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   ```sql
   CREATE DATABASE digital_wallet;
   ```

### Option B: Cloud PostgreSQL (Easier)

1. Sign up for [Neon](https://neon.tech) (free tier available)
2. Create a new project
3. Copy the connection string

## Step 2: Configure Backend

1. Navigate to the backend folder:
   ```bash
   cd Digital-Wallet/backend
   ```

2. Copy the example environment file:
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.example .env
   
   # On Mac/Linux:
   cp .env.example .env
   ```

3. Edit `.env` file with your database credentials:
   ```env
   DB_HOST=localhost          # or your cloud DB host
   DB_PORT=5432
   DB_NAME=digital_wallet
   DB_USER=postgres           # or your DB username
   DB_PASSWORD=your_password  # your DB password
   
   JWT_SECRET=your_random_secret_key_here
   ```

## Step 3: Run Database Migrations

```bash
cd Digital-Wallet/backend
npm run migrate
```

This will create all the necessary tables in your database.

## Step 4: Start Backend Server

```bash
cd Digital-Wallet/backend
npm run dev
```

The backend should start on `http://localhost:3001`

You should see:
- ✅ PostgreSQL connected successfully
- ⚠️  Redis not configured - running without cache (this is fine!)
- 🚀 Digital Wallet API running on port 3001

## Step 5: Start Frontend

Open a **new terminal** window:

```bash
cd Digital-Wallet/frontend
npm run dev
```

The frontend should start on `http://localhost:5173` (or another port)

## Step 6: Test the App

1. Open your browser to `http://localhost:5173`
2. Register a new account
3. Start using the digital wallet!

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Check your `.env` file has correct credentials
- Verify the database exists

### Port Already in Use
- Change `PORT` in `.env` file to another port (e.g., 3002)
- Update frontend `VITE_API_BASE_URL` if you change the port

### Redis Warnings
- These are normal! The app works fine without Redis
- Just ignore the Redis warnings

