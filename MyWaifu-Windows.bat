@echo off
setlocal enabledelayedexpansion

REM Step: Check if Node.js is installed
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed. Please check the guide at https://github.com/2D-girls-enjoyer/MyWaifu.
    pause
    exit /b
)

cd ./api

if not exist dist (
    echo Installing dependencies in ./api...
    call npm i

    REM Step: Run "npm run build"
    echo Building the project in ./api...
    call npm run build

    REM Step: Delete the "node_modules" folder
    echo Deleting node_modules in ./api...
    rd /s /q node_modules

    REM Step : Run "npm install --omit=dev"
    echo Installing production dependencies in ./api...
    call npm install --omit=dev
)

REM Step: Access the "./ui" folder
cd ../ui

if not exist dist (
    REM Step: Run "npm i"
    echo Installing dependencies in ./ui...
    call npm i

    REM Step: Run "npm run build"
    echo Building the project in ./ui...
    call npm run build

    REM Step: Delete the "node_modules" folder
    echo Deleting node_modules in ./ui...
    rd /s /q node_modules

    REM Step: Run "npm install --omit=dev"
    echo Installing production dependencies in ./ui...
    call npm install --omit=dev
)

REM Step: Return to the previous folder
cd ..

REM Script finished, starting the Servers
call node scripts/startServers.js
