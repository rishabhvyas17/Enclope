# CI/CD Setup with GitHub Actions

This guide helps you set up automatic deployments to Google Cloud Run whenever you push to the `main` branch.

## Prerequisites

1. Your code in a GitHub repository
2. Google Cloud project already set up
3. MongoDB Atlas database configured

## Setup Steps

### 1. Create a Service Account in Google Cloud

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Create service account
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions Deployer"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

# Create and download key
gcloud iam service-accounts keys create key.json \
    --iam-account=github-actions@${PROJECT_ID}.iam.gserviceaccount.com
```

### 2. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

1. **GCP_PROJECT_ID**
   - Value: Your Google Cloud project ID

2. **GCP_SA_KEY**
   - Value: Contents of the `key.json` file you just created
   - Copy the entire JSON content

3. **MONGODB_URI**
   - Value: Your MongoDB Atlas connection string
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/enclope`

### 3. Delete the Key File (Security!)

```bash
rm key.json
```

The key is now safely stored in GitHub Secrets.

### 4. Push to GitHub

The workflow file is already in [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

```bash
git add .
git commit -m "Add Google Cloud deployment configuration"
git push origin main
```

## How It Works

1. On every push to `main` branch (or manual trigger)
2. GitHub Actions checks out your code
3. Authenticates with Google Cloud using the service account
4. Deploys backend to Cloud Run
5. Deploys frontend to Cloud Run
6. Prints the frontend URL

## View Deployment Status

- Go to your GitHub repository
- Click "Actions" tab
- See deployment progress in real-time

## Manual Trigger

You can also manually trigger deployment:

1. Go to Actions tab
2. Select "Deploy to Google Cloud Run"
3. Click "Run workflow"
4. Choose branch and run

## Customize Deployment

Edit [.github/workflows/deploy.yml](.github/workflows/deploy.yml) to:

- Change deployment region
- Adjust memory/CPU limits
- Add environment variables
- Deploy on different branches
- Add tests before deployment

### Example: Add Testing Step

```yaml
- name: Run tests
  run: |
    cd server
    npm install
    npm test
```

### Example: Deploy to Staging

```yaml
on:
  push:
    branches:
      - main      # Production
      - staging   # Staging environment
```

## Troubleshooting

### Authentication Failed
- Verify `GCP_SA_KEY` secret contains valid JSON
- Check service account has required permissions

### Deployment Failed
- Check GitHub Actions logs
- Verify secrets are set correctly
- Ensure APIs are enabled in Google Cloud

### MongoDB Connection Issues
- Verify `MONGODB_URI` secret is correct
- Check MongoDB Atlas IP whitelist

## Security Best Practices

✅ **DO:**
- Use GitHub Secrets for sensitive data
- Use service accounts with minimal permissions
- Rotate service account keys periodically
- Review deployment logs regularly

❌ **DON'T:**
- Commit credentials to repository
- Share service account keys
- Use overly permissive IAM roles
- Store secrets in code or config files

## Cost Monitoring

GitHub Actions is free for public repositories with limits:
- 2,000 minutes/month for private repos
- Unlimited for public repos

Google Cloud Run stays free within usage limits.

## Alternative: Deploy on Release

To deploy only when you create a release tag:

```yaml
on:
  release:
    types: [published]
```

Then create releases:
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

For manual deployment, see [QUICK_START.md](./QUICK_START.md)
