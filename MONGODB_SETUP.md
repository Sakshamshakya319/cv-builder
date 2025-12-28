# 🍃 MongoDB Atlas Setup Guide

## 🚨 **Common MongoDB Connection Issues & Solutions**

### **Issue 1: IP Whitelist Error**
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

**✅ Solution:**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to **Network Access** (left sidebar)
3. Click **"Add IP Address"**
4. **For Render/Production**: Choose **"Allow Access from Anywhere"** (`0.0.0.0/0`)
5. **For Development**: Add your current IP or choose **"Add Current IP Address"**
6. Click **"Confirm"**
7. **Wait 2-3 minutes** for changes to take effect

### **Issue 2: Authentication Failed**
```
MongooseServerSelectionError: Authentication failed
```

**✅ Solution:**
1. Go to **Database Access** (left sidebar)
2. Check your database user exists
3. Verify username and password in connection string
4. Ensure user has **"Read and write to any database"** privileges
5. If password contains special characters, URL encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`

### **Issue 3: Wrong Connection String Format**
**❌ Wrong:**
```
mongodb+srv://username:password@cluster.mongodb.net/
```

**✅ Correct:**
```
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

---

## 🔧 **Step-by-Step MongoDB Atlas Setup**

### **Step 1: Create Account & Cluster**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create organization and project
4. Click **"Build a Database"**
5. Choose **M0 FREE** tier
6. Select cloud provider and region (closest to your users)
7. Name your cluster (e.g., `cv-generator-cluster`)
8. Click **"Create Cluster"** (takes 3-5 minutes)

### **Step 2: Create Database User**
1. Go to **Database Access** → **Add New Database User**
2. **Authentication Method**: Password
3. **Username**: `cvgenerator` (or your choice)
4. **Password**: Generate secure password (save it!)
5. **Database User Privileges**: 
   - Built-in Role: **"Read and write to any database"**
6. **Restrict Access to Specific Clusters**: Leave default
7. Click **"Add User"**

### **Step 3: Configure Network Access**
1. Go to **Network Access** → **Add IP Address**

**For Development:**
```
Add Current IP Address (your local machine)
```

**For Production (Render):**
```
IP Address: 0.0.0.0/0
Comment: Allow access from anywhere (Render deployment)
```

**For Enhanced Security (Optional):**
```
You can add specific Render IP ranges instead of 0.0.0.0/0
Check Render documentation for current IP ranges
```

### **Step 4: Get Connection String**
1. Go to **Clusters** → Click **"Connect"**
2. Choose **"Connect your application"**
3. **Driver**: Node.js
4. **Version**: 4.1 or later
5. Copy connection string:
```
mongodb+srv://cvgenerator:<password>@cv-generator-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### **Step 5: Customize Connection String**
Replace placeholders:
```
mongodb+srv://cvgenerator:YOUR_ACTUAL_PASSWORD@cv-generator-cluster.xxxxx.mongodb.net/cv-generator?retryWrites=true&w=majority&appName=CV-Builder
```

**Components:**
- `cvgenerator` → Your username
- `YOUR_ACTUAL_PASSWORD` → Your actual password
- `cv-generator-cluster.xxxxx` → Your actual cluster URL
- `cv-generator` → Database name (will be created automatically)
- `appName=CV-Builder` → Application identifier

---

## 🔒 **Security Best Practices**

### **Environment Variables**
**❌ Never do this:**
```javascript
// DON'T hardcode in your code
mongoose.connect('mongodb+srv://user:pass@cluster.mongodb.net/db');
```

**✅ Always do this:**
```javascript
// Use environment variables
mongoose.connect(process.env.MONGODB_URI);
```

### **Password Security**
- Use strong passwords (16+ characters)
- Include uppercase, lowercase, numbers, symbols
- Avoid dictionary words
- Don't reuse passwords from other services

### **Network Security**
- **Development**: Whitelist specific IPs when possible
- **Production**: Use `0.0.0.0/0` for cloud deployments (Render, Vercel, etc.)
- **Corporate**: Use VPN or specific IP ranges

---

## 🧪 **Testing Your Connection**

### **Local Testing**
```bash
# In your server directory
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch(err => console.error('❌ Connection Failed:', err.message));
"
```

### **Production Testing**
```bash
# Test your deployed API health endpoint
curl https://your-render-app.onrender.com/health

# Expected response:
{
  "status": "OK",
  "message": "CV Generator API is running",
  "timestamp": "2024-12-28T10:30:00.000Z"
}
```

---

## 📊 **MongoDB Atlas Dashboard Overview**

### **Key Sections:**
1. **Clusters** - View and manage your databases
2. **Network Access** - IP whitelist management
3. **Database Access** - User management
4. **Monitoring** - Performance metrics
5. **Backup** - Automated backups (paid tiers)
6. **Data Services** - Additional tools and services

### **Monitoring Your Usage:**
- **Storage**: Free tier includes 512MB
- **Bandwidth**: 1GB/month transfer limit
- **Connections**: 500 concurrent connections max
- **Operations**: No limit on reads/writes

---

## 🚨 **Troubleshooting Checklist**

When you get connection errors, check these in order:

### ✅ **1. Environment Variables**
```bash
# Check if MONGODB_URI is set
echo $MONGODB_URI

# In Node.js
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not Set');
```

### ✅ **2. Network Access**
- Is your IP whitelisted?
- For cloud deployments, is `0.0.0.0/0` added?
- Did you wait 2-3 minutes after adding IP?

### ✅ **3. Database User**
- Does the user exist?
- Is the password correct?
- Does user have proper permissions?

### ✅ **4. Connection String Format**
- Is the format correct?
- Are special characters URL encoded?
- Is the database name included?

### ✅ **5. Cluster Status**
- Is the cluster running? (Check Atlas dashboard)
- Is it in the same region you expect?

---

## 💰 **Free Tier Limits**

MongoDB Atlas M0 (Free) includes:
- **Storage**: 512MB
- **RAM**: Shared
- **Bandwidth**: 1GB/month
- **Connections**: 500 concurrent
- **Backup**: None (manual export only)
- **Uptime**: No SLA

**When to Upgrade:**
- Storage > 500MB
- Need guaranteed uptime
- Require automated backups
- Need dedicated resources

---

## 📞 **Getting Help**

### **MongoDB Atlas Support:**
- [MongoDB Community Forums](https://www.mongodb.com/community/forums/)
- [Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Connection Troubleshooting](https://www.mongodb.com/docs/atlas/troubleshoot-connection/)

### **Project-Specific Issues:**
- Check server logs in Render dashboard
- Use the health endpoint to test connectivity
- Review environment variables in deployment platform

---

**Remember**: Always keep your MongoDB credentials secure and never commit them to version control! 🔐