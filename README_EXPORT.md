# Project Export

To download a ZIP of this project:

1. Push this repo to GitHub (or ensure it's already connected).
2. In GitHub → **Actions** → **Export Project ZIP** → **Run workflow** (optionally keep *include_build* = true).
3. After it finishes, open the run → **Artifacts** → download `project-export.zip`.

**Includes:** source, configs, optional build output.  
**Excludes:** `node_modules`, `.git`, caches, logs, and real `.env` (only `.env.example` with placeholders).

## Quick Start (after download)

```bash
# Development
npm i
npm run dev

# Production 
npm ci && npm run build && npm run start
```

**Note:** Copy `.env.example` → `.env` and fill in your actual values before running.