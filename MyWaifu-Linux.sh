#!/bin/bash

# Step: Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please check the guide at https://github.com/2D-girls-enjoyer/MyWaifu."
    exit 1
fi

cd ./api

if [ ! -d dist ]; then
    echo "Installing dependencies in ./api..."
    npm install

    # Step: Run "npm run build"
    echo "Building the project in ./api..."
    npm run build

    # Step: Delete the "node_modules" folder
    echo "Deleting node_modules in ./api..."
    rm -rf node_modules

    # Step: Run "npm install --omit=dev"
    echo "Installing production dependencies in ./api..."
    npm install --omit=dev
fi

# Step: Run "npm run start" in the background
echo "Starting the server in ./api..."
npm run start &

# Step: Return to the previous folder
cd ..

# Step: Access the "./ui" folder
cd ./ui

if [ ! -d dist ]; then
    # Step: Run "npm i"
    echo "Installing dependencies in ./ui..."
    npm install

    # Step: Run "npm run build"
    echo "Building the project in ./ui..."
    npm run build

    # Step: Delete the "node_modules" folder
    echo "Deleting node_modules in ./ui..."
    rm -rf node_modules

    # Step: Run "npm install --omit=dev"
    echo "Installing production dependencies in ./ui..."
    npm install --omit=dev
fi

# Step: Run "npm run preview"
echo "Starting the UI preview in ./ui..."
npm run preview &

# Script finished
echo "All done! Servers are running."

xdg-open http://localhost:4173