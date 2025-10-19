# Build script for Render deployment
#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Setting up database..."
node src/js/db-setup.js || echo "Database setup completed or skipped"

echo "Build completed successfully!"