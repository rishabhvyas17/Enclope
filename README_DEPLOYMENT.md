# Enclope - Deployment Documentation

## 📋 What's Been Prepared

Your application is now ready for deployment to Google Cloud's free tier! Here's what's been set up:

### ✅ Configuration Files Created

#### Backend ([server/](./server/))
- `Dockerfile` - Containerizes your Node.js/Express backend
- `.dockerignore` - Excludes unnecessary files from Docker build
- `.env.example` - Template for environment variables
- Updated `config/db.js` - Now uses environment variables for MongoDB

#### Frontend ([client/](./client/))
- `Dockerfile` - Multi-stage build for optimized React app
- `nginx.conf` - Nginx configuration for serving static files
- `.dockerignore` - Excludes unnecessary files from Docker build

#### Deployment Tools
- `deploy.sh` - Interactive deployment script
- `.github/workflows/deploy.yml` - GitHub Actions for CI/CD

#### Documentation
- `QUICK_START.md` - 5-step deployment guide
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment instructions
- `CI_CD_SETUP.md` - Automatic deployment setup
- `README_DEPLOYMENT.md` - This file

## 🚀 Quick Deployment (Choose One Path)

### Option A: Manual Deployment (Recommended for First Time)

Follow the [QUICK_START.md](./QUICK_START.md) guide:

1. Install Google Cloud SDK
2. Set up MongoDB Atlas (free)
3. Create Google Cloud project
4. Run `./deploy.sh`

**Time required:** ~20-30 minutes

### Option B: Automated CI/CD

Follow the [CI_CD_SETUP.md](./CI_CD_SETUP.md) guide to set up automatic deployments on every git push.

**Time required:** ~15 minutes setup

## 💰 Cost Breakdown (FREE!)

### What You're Using (All Free Tier)

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| **Cloud Run** (Backend) | 2M requests/month | ~1K requests/month | $0 |
| **Cloud Run** (Frontend) | 360K GB-seconds | ~10K GB-seconds | $0 |
| **MongoDB Atlas** | 512MB storage | ~50MB | $0 |
| **Network Egress** | 1GB/month | ~100MB | $0 |
| **Total** | | | **$0/month** |

You'll stay free unless you exceed the limits above.

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Internet                           │
└────────────┬────────────────────────┬───────────────────┘
             │                        │
             ▼                        ▼
    ┌────────────────┐       ┌────────────────┐
    │  Cloud Run     │       │  Cloud Run     │
    │  (Frontend)    │──────▶│  (Backend)     │
    │                │       │                │
    │  React + Vite  │       │  Node.js +     │
    │  + Three.js    │       │  Express       │
    │  + Nginx       │       │                │
    └────────────────┘       └────────┬───────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │  MongoDB      │
                              │  Atlas        │
                              │  (Free M0)    │
                              └───────────────┘
```

## 📝 Pre-Deployment Checklist

Before you deploy, make sure you have:

- [ ] Google Cloud account (with billing enabled)
- [ ] MongoDB Atlas account (free tier)
- [ ] Google Cloud SDK installed (`gcloud`)
- [ ] MongoDB connection string ready
- [ ] Google Cloud project created
- [ ] Required APIs enabled (Cloud Run, Cloud Build, Container Registry)

## 🎯 Deployment Steps Summary

### Step 1: MongoDB Atlas (5 minutes)
```bash
# 1. Sign up at https://www.mongodb.com/cloud/atlas/register
# 2. Create M0 Free cluster
# 3. Create database user
# 4. Whitelist 0.0.0.0/0
# 5. Get connection string
```

### Step 2: Google Cloud Setup (10 minutes)
```bash
# Install gcloud CLI
brew install --cask google-cloud-sdk

# Initialize
gcloud init

# Enable APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### Step 3: Deploy (5-10 minutes)
```bash
# Set environment variables
export GCLOUD_PROJECT_ID="your-project-id"
export MONGODB_URI="your-mongodb-uri"

# Run deployment
./deploy.sh
```

## 🔍 Post-Deployment Verification

After deployment, verify everything works:

### 1. Test Backend
```bash
# Health check
curl https://your-backend-url/

# API endpoint
curl https://your-backend-url/api/projects
```

### 2. Test Frontend
```bash
# Open in browser
open https://your-frontend-url/
```

### 3. Check Logs
```bash
# Backend logs
gcloud run logs read enclope-backend --limit 50

# Frontend logs
gcloud run logs read enclope-frontend --limit 50
```

## 🛠️ Common Tasks

### Update Your Deployment
```bash
# After making code changes
./deploy.sh
```

### View Live Logs
```bash
gcloud run logs tail enclope-backend
```

### Delete Services (if needed)
```bash
gcloud run services delete enclope-backend --region us-central1
gcloud run services delete enclope-frontend --region us-central1
```

### Check Service Status
```bash
gcloud run services list
```

## 🎨 Custom Domain Setup

Want to use your own domain? (e.g., www.enclope.com)

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Select your frontend service
3. Click "Manage Custom Domains"
4. Follow the verification steps
5. Update your domain's DNS records

HTTPS is automatically enabled!

## 📈 Monitoring & Alerts

### Set Up Budget Alert
```bash
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT_ID \
  --display-name="Free Tier Alert" \
  --budget-amount=1USD
```

### Monitor Usage
- Go to [Cloud Console](https://console.cloud.google.com)
- Navigate to "Billing" → "Reports"
- Check your usage

## 🐛 Troubleshooting

### Issue: Backend can't connect to MongoDB
**Solution:**
1. Verify MongoDB connection string
2. Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
3. Verify environment variable: `gcloud run services describe enclope-backend`

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console (F12)
2. Verify build succeeded in Cloud Run logs
3. Check nginx logs: `gcloud run logs read enclope-frontend`

### Issue: "Permission denied" errors
**Solution:**
1. Ensure you're logged in: `gcloud auth login`
2. Set correct project: `gcloud config set project YOUR_PROJECT_ID`
3. Check IAM permissions in Cloud Console

### Issue: Build fails
**Solution:**
1. Check Dockerfile syntax
2. Verify all dependencies in package.json
3. Check Cloud Build logs in console

## 🔐 Security Best Practices

✅ **Implemented:**
- Environment variables for secrets
- CORS configuration
- Security headers in nginx
- IP whitelisting for MongoDB

✅ **Recommended:**
- Set up Cloud Armor (DDoS protection)
- Enable Cloud Audit Logs
- Implement rate limiting
- Use Secret Manager for sensitive data

## 📚 Additional Resources

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Best Practices](https://react.dev/learn)

## 🎓 What You've Learned

By deploying this application, you've:
- Containerized a full-stack application with Docker
- Set up cloud-native infrastructure
- Configured environment-based deployments
- Implemented CI/CD (optional)
- Worked with MongoDB Atlas
- Used Google Cloud services

## 🚧 Next Steps

After successful deployment:

1. **Custom Domain** - Make it professional
2. **CI/CD** - Automate deployments (see CI_CD_SETUP.md)
3. **Monitoring** - Set up alerts and dashboards
4. **Analytics** - Add Google Analytics or similar
5. **SEO** - Optimize meta tags and sitemap
6. **Performance** - Enable CDN for static assets
7. **Testing** - Add automated tests

## 💡 Tips for Staying in Free Tier

- Minimize requests (use caching)
- Optimize images (compress, use WebP)
- Set max instances to 1
- Use MongoDB indexes efficiently
- Enable Cloud Run concurrency (default: 80)

## 🎉 Success!

Once deployed, your Enclope website will be:
- ✅ Live and accessible worldwide
- ✅ Running on free tier (no cost!)
- ✅ Automatically scaling
- ✅ HTTPS enabled
- ✅ Production-ready

---

**Need Help?**
- Check the detailed guides in this directory
- Review Google Cloud documentation
- Check MongoDB Atlas support
- Review application logs

**Ready to Deploy?** Start with [QUICK_START.md](./QUICK_START.md)!
