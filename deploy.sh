#!/bin/bash

# Enclop Deployment Script for Google Cloud Run
# This script deploys both backend and frontend to Google Cloud Run

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Enclop Deployment Script ===${NC}\n"

# Configuration - UPDATE THESE VALUES
PROJECT_ID="${GCLOUD_PROJECT_ID:-}"
MONGODB_URI="${MONGODB_URI:-}"
REGION="us-central1"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if gcloud is installed
if ! command_exists gcloud; then
    echo -e "${RED}Error: gcloud CLI is not installed${NC}"
    echo "Install it with: brew install --cask google-cloud-sdk"
    exit 1
fi

# Prompt for Project ID if not set
if [ -z "$PROJECT_ID" ]; then
    echo -e "${YELLOW}Enter your Google Cloud Project ID:${NC}"
    read -r PROJECT_ID
fi

# Set the project
echo -e "\n${GREEN}Setting Google Cloud project to: $PROJECT_ID${NC}"
gcloud config set project "$PROJECT_ID"

# Ask what to deploy
echo -e "\n${YELLOW}What would you like to deploy?${NC}"
echo "1) Frontend only (Recommended - no database needed)"
echo "2) Backend only"
echo "3) Both (backend and frontend)"
read -r -p "Enter your choice (1-3): " choice

deploy_backend() {
    echo -e "\n${GREEN}=== Deploying Backend ===${NC}"

    # Prompt for MongoDB URI if not set
    if [ -z "$MONGODB_URI" ]; then
        echo -e "${YELLOW}Enter your MongoDB Atlas connection string:${NC}"
        echo -e "${YELLOW}(Format: mongodb+srv://username:password@cluster.mongodb.net/enclop)${NC}"
        read -r MONGODB_URI
    fi

    cd server

    gcloud run deploy enclop-backend \
        --source . \
        --platform managed \
        --region "$REGION" \
        --allow-unauthenticated \
        --set-env-vars "MONGODB_URI=$MONGODB_URI" \
        --max-instances 1 \
        --memory 512Mi \
        --cpu 1

    BACKEND_URL=$(gcloud run services describe enclop-backend --region="$REGION" --format="value(status.url)")
    echo -e "\n${GREEN}Backend deployed successfully!${NC}"
    echo -e "${GREEN}Backend URL: $BACKEND_URL${NC}"
    cd ..
}

deploy_frontend() {
    echo -e "\n${GREEN}=== Deploying Frontend ===${NC}"
    cd client

    gcloud run deploy enclop-frontend \
        --source . \
        --platform managed \
        --region "$REGION" \
        --allow-unauthenticated \
        --port 8080 \
        --max-instances 1 \
        --memory 512Mi \
        --cpu 1

    FRONTEND_URL=$(gcloud run services describe enclop-frontend --region="$REGION" --format="value(status.url)")
    echo -e "\n${GREEN}Frontend deployed successfully!${NC}"
    echo -e "${GREEN}Frontend URL: $FRONTEND_URL${NC}"
    cd ..
}

# Deploy based on choice
case $choice in
    1)
        deploy_frontend
        ;;
    2)
        deploy_backend
        ;;
    3)
        deploy_backend
        deploy_frontend
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}\n"
echo -e "Your services are now live:"
[ -n "$BACKEND_URL" ] && echo -e "Backend:  ${GREEN}$BACKEND_URL${NC}"
[ -n "$FRONTEND_URL" ] && echo -e "Frontend: ${GREEN}$FRONTEND_URL${NC}"

echo -e "\n${YELLOW}To view logs:${NC}"
[ -n "$BACKEND_URL" ] && echo "Backend:  gcloud run logs read enclop-backend --region $REGION"
[ -n "$FRONTEND_URL" ] && echo "Frontend: gcloud run logs read enclop-frontend --region $REGION"

echo -e "\n${GREEN}Done!${NC}"
