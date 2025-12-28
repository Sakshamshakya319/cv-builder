# 🚀 Deployment Guide

## Overview
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas

---

## 🔧 **Step 1: Setup MongoDB Atlas**

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (Free M0 tier)

### 1.2 Configure Network Access
1. In Atlas Dashboard → **Network Access**
2. Click **"Add IP Address"**
3. **For Render deployment**: Add `0.0.0.0/0` (Allow access from anywhere)
4. **For security**: You can also add specific Render IP ranges
5. Click **"Confirm"** and wait 2-3 minutes

### 1.3 Create Database User
1. In Atlas Dashboard → **Database Access**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `your_username`
5. Password: `your_secure_password` (save this!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Get Connection String
1. In Atlas Dashboard → **Clusters** → **Connect**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **4.1 or later**
4. Copy the connection string:
```
mongodb+srv://your_username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. Replace `<password>` with your actual password
6. Add database name: `?retryWrites=true&w=majority&appName=CV-Builder`

---

## 🚀 **Step 2: Deploy Backend to Render**

### 2.1 Prepare Repository
```bash
# Create a separate repository for the server or use the same repo
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2.2 Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `cv-generator-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 2.3 Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/cv-generator?retryWrites=true&w=majority&appName=CV-Builder
JWT_SECRET=your_super_secure_jwt_secret_here_make_it_very_long_and_random_123456789
PORT=10000
```

**⚠️ IMPORTANT**: 
- Replace `your_username` and `your_password` with your actual MongoDB credentials
- Replace `cluster0.xxxxx` with your actual cluster URL from Step 1.4
- Make JWT_SECRET at least 32 characters long and random

### 2.4 Deploy and Monitor
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Check logs for connection success:
   ```
   MongoDB Connected: cluster0-shard-00-02.xxxxx.mongodb.net:27017
   Database: cv-generator
   Server running on port 10000
   ```

### 2.5 Test Your API
Your Render URL will be: `https://your-app-name.onrender.com`

Test the health endpoint:
```bash
curl https://your-app-name.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "CV Generator API is running",
  "timestamp": "2024-12-28T10:30:00.000Z"
}
```

---

## 🌐 **Step 3: Deploy Frontend to Vercel**

### 3.1 Update API URL
1. Edit `client/.env.production`:
```env
VITE_API_URL=https://your-render-app.onrender.com
VITE_APP_NAME=CV Generator
```

2. Update CORS in server (if needed):
```javascript
// In server/server.js, update corsOptions.origin
origin: [
  'https://your-vercel-app.vercel.app',
  /\.vercel\.app$/
]
```

### 3.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Set Environment Variables
In Vercel dashboard, add:
```
VITE_API_URL=https://your-render-app.onrender.com
VITE_APP_NAME=CV Generator
```

### 3.4 Deploy
Click "Deploy" and wait for completion.

---

## ✅ **Step 4: Final Configuration**

### 4.1 Update CORS Origins
After getting your Vercel URL, update `server/server.js`:
```javascript
const corsOptions = {
  origin: [
    'https://your-actual-vercel-url.vercel.app', // Replace with actual URL
    /\.vercel\.app$/
  ],
  // ... rest of config
};
```

### 4.2 Redeploy Server
Push the CORS changes to trigger a Render redeploy.

### 4.3 Test the Application
1. Visit your Vercel URL
2. Test CV/Resume creation
3. Test PDF download functionality
4. Verify data persistence

---

## 🔍 **Troubleshooting**

### Common Issues:

1. **CORS Errors**
   - Check Render logs for CORS configuration
   - Ensure Vercel URL is in CORS origins

2. **API Connection Failed**
   - Verify `VITE_API_URL` in Vercel environment variables
   - Check Render service is running

3. **MongoDB Connection**
   - Verify `MONGODB_URI` in Render environment variables
   - Check MongoDB Atlas network access

4. **Build Failures**
   - Check build logs in Vercel/Render dashboards
   - Verify all dependencies are in package.json

### Useful Commands:
```bash
# Test local production build
cd client && npm run build && npm run preview

# Check server health
curl https://your-render-app.onrender.com/health

# View logs
# Check Render dashboard for server logs
# Check Vercel dashboard for build logs
```

---

## 📊 **Monitoring**

### Health Checks:
- **Server**: `https://your-render-app.onrender.com/health`
- **Client**: Your Vercel URL should load the CV Generator

### Performance:
- Render free tier: May sleep after 15 minutes of inactivity
- First request after sleep: ~30 seconds to wake up
- Vercel: Instant loading for static frontend

---

## 💰 **Cost Breakdown**

- **Vercel**: Free (Hobby plan)
- **Render**: Free (with limitations)
- **MongoDB Atlas**: Free (512MB storage)
- **Total**: $0/month for development/personal use

---

## 🔄 **Updates & Maintenance**

### To Update Frontend:
1. Make changes to client code
2. Push to GitHub
3. Vercel auto-deploys from main branch

### To Update Backend:
1. Make changes to server code
2. Push to GitHub
3. Render auto-deploys from main branch

### Database Maintenance:
- Monitor MongoDB Atlas usage
- Set up alerts for storage limits
- Regular backups (if needed)