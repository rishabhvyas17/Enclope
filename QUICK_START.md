# Quick Start - Deploy to Google Cloud Free Tier

## TL;DR - Deploy in 5 Steps

### 1. Install Google Cloud SDK
```bash
brew install --cask google-cloud-sdk
gcloud init
```

### 2. Set Up MongoDB Atlas (Free)
- Sign up at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
- Create M0 Free cluster
- Create database user
- Whitelist all IPs (0.0.0.0/0)
- Copy connection string

### 3. Create Google Cloud Project
- Go to [https://console.cloud.google.com](https://console.cloud.google.com)
- Create new project
- Enable billing (free tier won't charge)
- Note your PROJECT_ID

### 4. Enable APIs
```bash
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com
```

### 5. Deploy!
```bash
cd /Users/krishnasoni/Documents/3D\ Object/enlcop/Enclope

# Set environment variables
export GCLOUD_PROJECT_ID="your-project-id"
export MONGODB_URI="your-mongodb-connection-string"

# Run deployment script
./deploy.sh
```

## What Gets Deployed

### Backend (Node.js + Express)
- **Service**: Cloud Run (2M free requests/month)
- **Database**: MongoDB Atlas (512MB free)
- **Endpoint**: `/api/projects`

### Frontend (React + Vite + Three.js)
- **Service**: Cloud Run
- **Build**: Optimized production build
- **Server**: Nginx

## Free Tier Limits

You'll stay free as long as you don't exceed:
- **Cloud Run**: 2M requests/month, 360k GB-seconds memory
- **MongoDB**: 512MB storage
- **Bandwidth**: 1GB/month egress

Perfect for a portfolio website!

## Manual Deployment

If you prefer to deploy manually without the script:

### Backend:
```bash
cd server
gcloud run deploy enclope-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="your-mongodb-uri"
```

### Frontend:
```bash
cd client
gcloud run deploy enclope-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## Verify Deployment

```bash
# Check backend
curl https://your-backend-url/

# Check API
curl https://your-backend-url/api/projects

# Open frontend
open https://your-frontend-url/
```

## Update Deployment

After making code changes:
```bash
./deploy.sh
# Choose what to redeploy
```

## View Logs

```bash
# Backend logs
gcloud run logs read enclope-backend --limit 50

# Frontend logs
gcloud run logs read enclope-frontend --limit 50

# Live logs (tail)
gcloud run logs tail enclope-backend
```

## Custom Domain

1. Go to Cloud Run → Select service → "Manage Custom Domains"
2. Verify domain ownership
3. Add DNS records provided by Google
4. Done!

## Cost Monitoring

Set up a budget alert:
```bash
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT_ID \
  --display-name="Free Tier Alert" \
  --budget-amount=1USD
```

## Troubleshooting

**Backend can't connect to MongoDB?**
- Check connection string format
- Verify IP whitelist (0.0.0.0/0)
- Check environment variables

**Frontend not loading?**
- Check browser console
- Verify build succeeded
- Check Cloud Run logs

**Port issues?**
- Backend uses Cloud Run's PORT env var
- Frontend uses port 8080 (nginx)

## Next Steps

- [ ] Set up custom domain
- [ ] Add CI/CD with GitHub Actions
- [ ] Connect frontend to backend API
- [ ] Add monitoring and alerts
- [ ] Set up staging environment

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
