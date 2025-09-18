#!/bin/bash

# Script to systematically fix unused imports and variables
# This will be run step by step to fix TypeScript errors

echo "Starting systematic TypeScript fixes..."

# Remove unused React imports (since React 17+ JSX transform)
find src -name "*.tsx" -type f -exec sed -i "1s/^import React from 'react';//" {} \;

# Remove unused ErrorBoundary React import
sed -i "1s/^import React from 'react';//" src/components/ErrorBoundary.tsx

echo "Fixed React imports in JSX files..."

# Fix specific files with known unused imports
echo "Fixing specific component imports..."