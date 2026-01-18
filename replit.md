# Caliph Students United

## Overview
A Next.js web application for a student organization called "Caliph Students United". The project features multiple pages including Home, Program, Meet the Hill, Caliph Connect, Startup Up, About, and Admin sections.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Package Manager**: npm

## Project Structure
```
app/                    # Next.js App Router pages
  page.tsx              # Home page
  layout.tsx            # Root layout
  about/                # About page
  program/              # Program page
  meet-the-hill/        # Meet the Hill page
  caliph-connect/       # Caliph Connect page
  startup-up/           # Startup Up page
  admin/                # Admin dashboard & verification
components/ui/          # Reusable UI components (shadcn/ui)
hooks/                  # Custom React hooks
lib/                    # Utility functions
public/                 # Static assets (images)
styles/                 # Global styles
```

## Development
- **Dev Server**: `npm run dev -- -p 5000 -H 0.0.0.0`
- **Build**: `npm run build`
- **Start**: `npm run start`

## Deployment
Configured for Replit autoscale deployment:
- Build: `npm run build`
- Run: `npm run start -- -p 5000 -H 0.0.0.0`

### Render Deployment Configuration
To deploy on Render, use these Environment Variables:
- **Key**: `DATABASE_URL`
  - **Value**: Your Supabase connection string (Transaction Poller recommended).
  - **Example**: `postgresql://postgres.[ID]:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres`
- **Key**: `SESSION_SECRET`
  - **Value**: Any long, unique random string for security.
- **Key**: `NODE_ENV`
  - **Value**: `production` (usually set by default)

## Configuration Notes
- `allowedDevOrigins: ['*']` in next.config.mjs allows Replit's proxy to work correctly in development
