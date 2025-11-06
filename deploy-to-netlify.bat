@echo off
echo ========================================
echo   TOMAS ENGLISH - NETLIFY DEPLOYMENT
echo   Backup deployment option
echo ========================================
echo.

echo [Step 1/5] Checking if Netlify CLI is installed...
where netlify >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Netlify CLI not found. Installing now...
    call npm install -g netlify-cli
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install Netlify CLI
        echo Please run: npm install -g netlify-cli
        pause
        exit /b 1
    )
    echo ✓ Netlify CLI installed successfully
) else (
    echo ✓ Netlify CLI is already installed
)
echo.

echo [Step 2/5] Verifying project dependencies...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)
echo ✓ Dependencies ready
echo.

echo [Step 3/5] Building production bundle...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo ✓ Build complete
echo.

echo [Step 4/5] Logging in to Netlify...
echo (Browser will open for authorization)
call netlify login
if %errorlevel% neq 0 (
    echo ERROR: Login failed
    pause
    exit /b 1
)
echo ✓ Logged in to Netlify
echo.

echo [Step 5/5] Deploying to Netlify...
echo.
echo ========================================
echo   IMPORTANT: Answer these prompts
echo ========================================
echo.
echo When Netlify asks:
echo 1. "Create & configure new site?" → Type: Y
echo 2. "Team?" → Select your team
echo 3. "Site name?" → Type: tomas-english (or your choice)
echo 4. "Publish directory?" → Type: dist
echo.
echo ========================================
pause
echo.

call netlify deploy --prod --dir=dist
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Deployment failed
    echo.
    echo Common issues:
    echo - Not logged in (run: netlify login)
    echo - Build files missing (run: npm run build)
    echo - Network connection issues
    pause
    exit /b 1
)

echo.
echo ========================================
echo   DEPLOYMENT SUCCESSFUL! 🎉
echo ========================================
echo.
echo Your app is now live on Netlify!
echo.
echo ⚠️ IMPORTANT NEXT STEP:
echo Add environment variables in Netlify dashboard:
echo.
echo 1. Go to: https://app.netlify.com
echo 2. Select your site
echo 3. Go to: Site settings → Environment variables
echo 4. Add these variables:
echo.
echo    VITE_SUPABASE_PROJECT_ID = sgzhbiknaiqsuknwgvjr
echo    VITE_SUPABASE_PUBLISHABLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4
echo    VITE_SUPABASE_URL = https://sgzhbiknaiqsuknwgvjr.supabase.co
echo    VITE_DID_VOICE_ID = en-US-AriaNeural
echo.
echo 5. Trigger redeploy from dashboard
echo.
echo ========================================
echo.
pause
