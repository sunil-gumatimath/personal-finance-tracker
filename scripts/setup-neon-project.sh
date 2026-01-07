#!/bin/bash

# Setup Neon Project Script
# This script helps you set up a Neon project for migration

echo "🚀 Setting up Neon project for migration..."
echo ""

# Check if neonctl is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js first."
    exit 1
fi

echo "📋 Step 1: Listing your Neon projects..."
npx neonctl@latest projects list

echo ""
echo "📋 Step 2: Creating new project (if needed)..."
read -p "Do you want to create a new project? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter project name (default: personal-finance-tracker): " project_name
    project_name=${project_name:-personal-finance-tracker}
    
    echo "Creating project: $project_name"
    npx neonctl@latest projects create --name "$project_name"
fi

echo ""
echo "📋 Step 3: Getting connection string..."
read -p "Enter your project ID: " project_id

if [ -n "$project_id" ]; then
    echo "Getting connection string for project: $project_id"
    connection_string=$(npx neonctl@latest connection-string --project-id "$project_id")
    
    echo ""
    echo "✅ Connection string:"
    echo "$connection_string"
    echo ""
    echo "📝 Add this to your .env file:"
    echo "VITE_NEON_DATABASE_URL=$connection_string"
    echo ""
else
    echo "⚠️  No project ID provided. Get it from Neon dashboard."
fi

echo ""
echo "✅ Setup complete!"
echo "Next steps:"
echo "1. Add connection string to .env"
echo "2. Import schema: Run supabase/database-neon.sql in Neon SQL Editor"
echo "3. Migrate data: Run 'bun run scripts/migrate-to-neon.ts'"
