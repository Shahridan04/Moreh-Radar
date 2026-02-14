# Moreh Radar

**Kill Hunger. Kill Waste.**

A tactical, real-time geospatial dashboard connecting mosques with surplus Ramadan food to university students in need. Built with Next.js 14, Supabase, and Leaflet.

## Features

- **Real-time Map:** View mosques with surplus food on a dark-mode tactical map.
- **"Saya Nak Pergi!" System:** Signal attendance to help mosques manage portions.
- **Community Broadcast:** AJK Masjid can broadcast food availability in seconds.
- **Impact Stats:** Track total meals saved and waste prevented.
- **Google Auth:** Secure login for broadcasters.

## Getting Started

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Google Authentication

Google Login requires configuration in your Supabase Dashboard.

1.  Go to **Authentication > Providers > Google**.
2.  Enable it and add your Client ID / Secret.
3.  Go to **URL Configuration**.
4.  Add your production URL (e.g., `https://your-app.vercel.app`) to "Redirect URLs".
5.  **Important:** For Vercel deployments, ensure you follow our [Auth Troubleshooting Guide](file:///C:/Users/idan2/.gemini/antigravity/brain/34517c17-4413-49cd-a066-aff7152f2a8f/auth_troubleshooting.md).

## Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShahridan04%2FMoreh-Radar)

Ensure you add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in Vercel project settings.
