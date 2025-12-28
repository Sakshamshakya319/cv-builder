# 🚀 Deployment Guide

## Overview
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas

---

## 🔧 **Step 1: Deploy Backend to Render**

### 1.1 Prepare Repository
```bash
# Create a separate repository for the server or use the same repo
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 1.2 Deploy on Render
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

### 1.3 Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://sakshamshakya319:dkML8Oi94v6p1a1L@cv-builder.u2s7qhl.mongodb.net/?appName=CV-Builder
JWT_SECRET=your_secure_jwt_secret_here_make_it_long_and_random
PORT=10000
```

### 1.4 Get Your Render URL
After deployment, you'll get a URL like: `https://cv-generator-api.onrender.com`

---

## 🌐 **Step 2: Deploy Frontend to Vercel**

### 2.1 Update API URL
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

### 2.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Set Environment Variables
In Vercel dashboard, add:
```
VITE_API_URL=https://your-render-app.onrender.com
VITE_APP_NAME=CV Generator
```

### 2.4 Deploy
Click "Deploy" and wait for completion.

---

## ✅ **Step 3: Final Configuration**

### 3.1 Update CORS Origins
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

### 3.2 Redeploy Server
Push the CORS changes to trigger a Render redeploy.

### 3.3 Test the Application
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