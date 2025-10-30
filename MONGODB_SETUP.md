# MongoDB Atlas IP Whitelist Setup Guide

## ⚠️ IMPORTANT - Do This Before Running Backend

Your MongoDB Atlas cluster needs to allow connections from your IP address. Follow these steps:

### Step 1: Go to MongoDB Atlas
Visit: https://cloud.mongodb.com/

### Step 2: Login
Use your credentials to access the dashboard

### Step 3: Navigate to Network Access
1. Select your project (if you have multiple)
2. Look for "Network Access" in the left sidebar under "SECURITY"
3. Click on "Network Access"

### Step 4: Add IP Address
1. Click the "+ ADD IP ADDRESS" button
2. You have two options:

   **Option A: Add Current IP (Recommended for Development)**
   - Click "ADD CURRENT IP ADDRESS"
   - MongoDB will auto-detect your IP
   - Click "Confirm"

   **Option B: Allow Access from Anywhere (For Testing)**
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - This will add 0.0.0.0/0
   - ⚠️ Warning: Less secure, use only for development
   - Click "Confirm"

### Step 5: Wait for Activation
- It takes about 1-2 minutes for the changes to take effect
- You'll see a status indicator showing when it's active

### Step 6: Verify Connection
```bash
cd backend
node seed.js
```

If successful, you'll see:
```
🌱 Connecting to MongoDB...
✅ MongoDB Connected: clusterdb-shard-00-00.3kozwe9.mongodb.net
```

## Troubleshooting

### Still Getting Connection Error?
1. Double-check that your IP was added correctly
2. Wait 2-3 minutes for the whitelist to propagate
3. If using VPN, try adding that IP address too
4. Try "Allow Access from Anywhere" temporarily to isolate the issue

### Multiple IPs?
If you work from different locations (home, office, coffee shop):
- Add each location's IP separately, OR
- Use "Allow Access from Anywhere" for development

### Production Deployment
For production, always:
- Use specific IP addresses
- Never use 0.0.0.0/0
- Update IPs when your infrastructure changes

## Visual Guide

```
MongoDB Atlas Dashboard
└── [Your Cluster]
    └── Security (in sidebar)
        └── Network Access
            └── [+ ADD IP ADDRESS]
                ├── Add Current IP Address ← Click this
                └── Allow Access from Anywhere
```

## Need Help?
MongoDB Atlas Documentation: https://www.mongodb.com/docs/atlas/security-whitelist/
