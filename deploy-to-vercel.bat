@echo off
echo ========================================
echo   TOMAS ENGLISH - VERCEL DEPLOYMENT
echo   Get shareable link in 3 minutes!
echo ========================================
echo.

echo [Step 1/4] Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Vercel CLI not found. Installing now...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install Vercel CLI
        echo Please run: npm install -g vercel
        pause
        exit /b 1
    )
    echo ✓ Vercel CLI installed successfully
) else (
    echo ✓ Vercel CLI is already installed
)
echo.

echo [Step 2/4] Verifying project dependencies...
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

echo [Step 3/4] Starting Vercel deployment...
echo.
echo ========================================
echo   IMPORTANT: Answer these prompts
echo ========================================
echo.
echo When Vercel asks:
echo 1. "Set up and deploy?" → Type: Y
echo 2. "Which scope?" → Select your account
echo 3. "Link to existing project?" → Type: N
echo 4. "Project name?" → Type: tomas-english (or your choice)
echo 5. "Directory?" → Press ENTER (use current)
echo 6. "Override settings?" → Type: N
echo.
echo ========================================
pause
echo.

call vercel --prod
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Deployment failed
    echo.
    echo Common issues:
    echo - Not logged in to Vercel (run: vercel login)
    echo - Network connection issues
    echo - Project build errors
    echo.
    echo Try running: vercel login
    echo Then run this script again
    pause
    exit /b 1
)

echo.
echo ========================================
echo   DEPLOYMENT SUCCESSFUL! 🎉
echo ========================================
echo.
echo Your app is now live!
echo.
echo ⚠️ IMPORTANT NEXT STEP:
echo You need to add environment variables for Supabase
echo.
echo Run these commands:
echo.
echo vercel env add VITE_SUPABASE_PROJECT_ID
echo (paste: sgzhbiknaiqsuknwgvjr)
echo.
echo vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
echo (paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnemhiaWtuYWlxc3VrbndndmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDkyNTUsImV4cCI6MjA2NzkyNTI1NX0.zi3agHTlckDVeDOQ-rFvC9X_TI21QOxiXzqbNs2UrG4)
echo.
echo vercel env add VITE_SUPABASE_URL
echo (paste: https://sgzhbiknaiqsuknwgvjr.supabase.co)
echo.
echo vercel env add VITE_DID_VOICE_ID
echo (paste: en-US-AriaNeural)
echo.
echo Then redeploy: vercel --prod
echo.
echo ========================================
echo OR use Vercel web dashboard to add env variables
echo Visit: https://vercel.com/dashboard
echo ========================================
echo.
pause
