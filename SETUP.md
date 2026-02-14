# MOREH RADAR — QUICK SETUP COMMANDS
Copy-paste these in order. Do not skip steps.

---

## STEP 1 — Create the project

```bash
npx create-next-app@latest moreh-radar --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd moreh-radar
```

## STEP 2 — Install packages

```bash
npm install leaflet react-leaflet @supabase/supabase-js
npm install -D @types/leaflet
```

## STEP 3 — Create .env.local

```bash
touch .env.local
```

Then paste (replace with your actual Supabase values):
```
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJXXXXXXXX
```

## STEP 4 — Run dev server

```bash
npm run dev
```

App is at http://localhost:3000

---

## SUPABASE SETUP (do this in browser)

1. Go to https://supabase.com → New Project → Region: Singapore
2. SQL Editor → New Query → paste the schema from VIBECODE_PROMPT.md → Run
3. Settings → API → copy URL and anon key into .env.local

---

## DEPLOY TO VERCEL

```bash
# Install vercel CLI (one time)
npm install -g vercel

# Deploy
vercel --prod
```

Then in Vercel dashboard → Settings → Environment Variables:
- Add `NEXT_PUBLIC_SUPABASE_URL`
- Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy once after adding env vars

---

## ADMIN PIN

The hardcoded PIN for posting food is: **1234**

(Change in PostModal.tsx before demo if you want)
