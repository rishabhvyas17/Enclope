# Enclope Deployment Guide - Google Cloud Free Tier

This guide will help you deploy your Enclope website to Google Cloud's free tier.

## Prerequisites

### 1. MongoDB Atlas Setup (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up
2. Create a new **FREE M0 cluster** (512MB storage)
3. Choose a cloud provider and region (preferably same region as your Cloud Run deployment)
4. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `enclope_user` (or your choice)
   - Generate a strong password and save it
5. Whitelist all IPs:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Cloud Run to connect
6. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add database name at the end: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/enclope`

**Save this connection string - you'll need it for deployment!**

### 2. Google Cloud Setup

#### Install Google Cloud SDK

```bash
# For macOS
brew install --cask google-cloud-sdk

# After installation, initialize gcloud
gcloud init
```

#### Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Create Project"
3. Enter project name (e.g., "enclope-website")
4. Note your PROJECT_ID (you'll need this)

#### Enable Billing

1. Go to "Billing" in the console
2. Link a billing account (required for free tier, but won't charge within limits)

#### Enable Required APIs

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## Deployment Steps

### Step 1: Deploy Backend Server

```bash
# Navigate to server directory
cd /Users/krishnasoni/Documents/3D\ Object/enlcop/Enclope/server

# Deploy to Cloud Run
gcloud run deploy enclope-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="your-mongodb-connection-string-here"

# Note: Replace "your-mongodb-connection-string-here" with your actual MongoDB Atlas connection string
```

After deployment completes, you'll get a URL like: `https://enclope-backend-xxxxx-uc.a.run.app`

**Save this backend URL!**

### Step 2: Update Frontend to Use Backend API (Optional)

If you want to fetch projects from MongoDB instead of using static data:

1. Update the vite config to proxy API requests (already done)
2. Modify the Showroom component to fetch from the backend
3. Or set an environment variable for the API URL

For now, the frontend uses static data, which is fine for deployment.

### Step 3: Deploy Frontend

```bash
# Navigate to client directory
cd /Users/krishnasoni/Documents/3D\ Object/enlcop/Enclope/client

# Deploy to Cloud Run
gcloud run deploy enclope-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080

# If you want to connect to the backend API, add:
# --set-env-vars VITE_API_URL="https://your-backend-url"
```

After deployment completes, you'll get a URL like: `https://enclope-frontend-xxxxx-uc.a.run.app`

**This is your live website URL!**

## Quick Deployment Script

I've created a helper script for you. Before using it:

1. Replace `YOUR_PROJECT_ID` with your actual Google Cloud project ID
2. Replace `YOUR_MONGODB_URI` with your MongoDB Atlas connection string

Then run:

```bash
cd /Users/krishnasoni/Documents/3D\ Object/enlcop/Enclope
chmod +x deploy.sh
./deploy.sh
```

## Free Tier Limits

### Google Cloud Run
- 2 million requests per month
- 360,000 GB-seconds of memory
- 180,000 vCPU-seconds of compute time
- 1 GB network egress per month

### MongoDB Atlas
- 512 MB storage
- Shared RAM
- No backup/restore

These limits are generous for a portfolio/demo website!

## Verify Deployment

After deployment, test your services:

```bash
# Test backend
curl https://your-backend-url/

# Test backend API
curl https://your-backend-url/api/projects

# Visit frontend
open https://your-frontend-url/
```

## Updating Your Deployment

When you make changes to your code:

```bash
# Redeploy backend
cd /Users/krishnasoni/Documents/3D\ Object/enlcop/Enclope/server
gcloud run deploy enclope-backend --source .

# Redeploy frontend
cd /Users/krishnasoni/Documents/3D\ Object/enlcop/Enclope/client
gcloud run deploy enclope-frontend --source .
```

## Custom Domain (Optional)

To use your own domain:

1. Go to Cloud Run console
2. Select your service
3. Click "Manage Custom Domains"
4. Follow the instructions to verify your domain
5. Update your domain's DNS records

## Monitoring

- View logs: `gcloud run logs read enclope-backend --limit 50`
- View frontend logs: `gcloud run logs read enclope-frontend --limit 50`
- Monitor in console: https://console.cloud.google.com/run

## Troubleshooting

### Backend won't connect to MongoDB
- Verify connection string is correct
- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Check environment variables: `gcloud run services describe enclope-backend --format="value(spec.template.spec.containers[0].env)"`

### Frontend shows blank page
- Check browser console for errors
- Verify build completed successfully
- Check nginx logs: `gcloud run logs read enclope-frontend`

### Port issues
- Backend uses PORT env variable (set by Cloud Run)
- Frontend nginx listens on port 8080

## Cost Monitoring

Monitor your usage to stay within free tier:
```bash
gcloud billing budgets create --billing-account=BILLING_ACCOUNT_ID \
  --display-name="Free Tier Alert" \
  --budget-amount=1USD
```

## Next Steps

1. Set up custom domain
2. Enable HTTPS (automatic with Cloud Run)
3. Set up CI/CD with GitHub Actions
4. Add monitoring and alerts
5. Implement backend API integration for dynamic content

---

Need help? Check the logs or reach out!
