@echo off
echo ========================================
echo   TOMAS ENGLISH - PRODUCTION DEPLOYMENT
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

echo [2/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [3/5] Building production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo ✓ Production build complete
echo.

echo [4/5] Build size analysis...
dir dist /s /-c | find "bytes"
echo.

echo [5/5] Ready to deploy!
echo.
echo ========================================
echo   DEPLOYMENT OPTIONS
echo ========================================
echo.
echo Option 1 - Vercel (RECOMMENDED):
echo   1. Install: npm install -g vercel
echo   2. Deploy: vercel --prod
echo   3. Follow prompts
echo.
echo Option 2 - Netlify:
echo   1. Install: npm install -g netlify-cli
echo   2. Deploy: netlify deploy --prod --dir=dist
echo   3. Follow prompts
echo.
echo Option 3 - Manual Upload:
echo   1. Open your hosting dashboard
echo   2. Upload entire 'dist' folder
echo   3. Configure SPA redirect rules
echo.
echo ========================================
echo Build files are in: %cd%\dist
echo ========================================
echo.
echo Would you like to deploy to Vercel now? (Y/N)
set /p DEPLOY_NOW=

if /i "%DEPLOY_NOW%"=="Y" (
    echo.
    echo Installing Vercel CLI...
    call npm install -g vercel
    echo.
    echo Starting Vercel deployment...
    echo NOTE: Login with GitHub when prompted
    call vercel --prod
) else (
    echo.
    echo Deployment skipped. Build files are ready in 'dist' folder.
)

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
pause
