# Simple Deployment Guide - Frontend Only

Since your app uses static data (no database needed), you can deploy just the frontend!

## Prerequisites (5 minutes)

### 1. Install Google Cloud SDK
```bash
brew install --cask google-cloud-sdk
gcloud init
```

### 2. Create Google Cloud Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click "Create Project"
3. Name it (e.g., "enclope")
4. Note your PROJECT_ID

### 3. Enable Billing
- Link a billing account (required for free tier)
- You won't be charged within free tier limits

## Deploy (One Command!)

```bash
cd "/Users/krishnasoni/Documents/3D Object/enlcop/Enclope"

# Run the deployment script
./deploy.sh

# When prompted:
# 1. Enter your Google Cloud Project ID
# 2. Choose option 1 (Frontend only - Recommended)
```

That's it! Your website will be live in 5-10 minutes.

## What You Get

- ✅ Live website URL (https://enclope-frontend-xxxxx.a.run.app)
- ✅ Automatic HTTPS
- ✅ Auto-scaling
- ✅ **100% FREE** (within 2M requests/month)

## After Deployment

### View Your Live Site
The script will display your URL when done. Open it in your browser!

### View Logs
```bash
gcloud run logs read enclope-frontend --limit 50
```

### Update Your Site
After making changes to your code:
```bash
./deploy.sh
# Choose option 1 again
```

## Free Tier Limits

You get **completely free**:
- 2 million requests/month
- 360,000 GB-seconds of memory
- 180,000 vCPU-seconds
- 1 GB network egress/month

Perfect for a portfolio website!

## Optional: Custom Domain

Want to use your own domain (e.g., www.enclope.com)?

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Select "enclope-frontend"
3. Click "Manage Custom Domains"
4. Follow the steps to verify and map your domain

HTTPS is automatic!

## Troubleshooting

### "gcloud command not found"
```bash
brew install --cask google-cloud-sdk
```

### "Permission denied"
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### "Build failed"
Check the error message in the terminal. Common issues:
- Missing dependencies (run `npm install` in client folder)
- Syntax errors in code

### Frontend shows blank page
- Check browser console (F12) for errors
- Verify build completed: `gcloud run logs read enclope-frontend`

## Do I Need MongoDB?

**No!** Your app currently uses static data from [client/src/data/content.js](client/src/data/content.js).

If you want to use the backend API later:
1. Set up MongoDB Atlas (free)
2. Deploy backend: `./deploy.sh` → Choose option 3
3. Update frontend to fetch from API

But for now, static data works perfectly!

## Cost Monitoring

Set up a budget alert to stay safe:
```bash
# Get your billing account ID
gcloud billing accounts list

# Create alert
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT_ID \
  --display-name="Free Tier Alert" \
  --budget-amount=1USD
```

You'll get an email if you ever start accruing charges.

## Next Steps

1. ✅ Deploy your site
2. Share your live URL
3. (Optional) Set up custom domain
4. (Optional) Set up CI/CD for auto-deployment on git push

---

**Ready to deploy?** Just run:
```bash
./deploy.sh
```

**Questions?** Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed info.
