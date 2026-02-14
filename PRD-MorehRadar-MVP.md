# MOREH RADAR — PRD (MVP)
> **Kill Hunger. Kill Waste.** Scanning for Rezeki.

---

## 🎯 One-Liner
A real-time tactical radar dashboard that connects mosques with surplus Ramadan food (Moreh) to hungry university students — instantly.

---

## 🔄 Core Loop (10 Seconds)

```
ADMIN (AJK) broadcasts → PIN auth → submit food signal
         ↓
MAP instantly shows pulsing green pin (realtime)
         ↓
STUDENT sees pin → taps "ENGAGE ROUTE" → Waze navigation
         ↓
ADMIN marks "DEPLETED" → pin goes grey → no wasted trips
```

---

## 🖥️ Visual Identity

| Element         | Value                                |
|-----------------|--------------------------------------|
| **Aesthetic**   | Cyberpunk Tactical / "High-Tech Humanitarian" |
| **Mode**        | Dark mode only                       |
| **Background**  | `#050505` (near pitch black)         |
| **Primary**     | `#00ff41` (Radar Green / neon)       |
| **Secondary**   | `#22c55e` (Tailwind green-500)       |
| **Alert**       | `#ffb000` (Amber warnings)           |
| **Typography**  | Share Tech Mono / JetBrains Mono (monospace only) |
| **Effects**     | CRT scanlines, radar sweep, neon pulse, glassmorphism |

---

## ⚡ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 14+ (App Router, TypeScript)|
| Styling     | Tailwind CSS v4                     |
| Map         | Leaflet + react-leaflet (CartoDB DarkMatter tiles) |
| Backend     | Supabase (Postgres + Realtime)      |
| Animation   | Framer Motion                       |
| Icons       | Lucide React                        |
| Deployment  | Vercel                              |

---

## 📍 Features

### A. Radar Screen (Home Map)
- Full-screen dark tactical map (CartoDB DarkMatter)
- Radar sweep animation overlay (rotating conic gradient)
- **Active** pins = pulsing neon green dots with ripple effect
- **Depleted** pins = hollow grey circles
- **User location** = blue target blip
- Clicking a pin opens the Signal Details drawer

### B. Command Interface (UI Overlay)
- **Top Bar**: `MOREH RADAR [SYSTEM ONLINE]` + animated meal counter
- **Bottom Ticker**: Stock-ticker style scrolling marquee with signal updates
- **Broadcast Button**: `[ + BROADCAST SIGNAL ]` with glow pulse

### C. Broadcast Form (Admin/AJK)
- PIN-protected (PIN: `2026`)
- PIN screen with shake animation on wrong entry
- Form: Mosque Name, Food Type, Pax, Status (ACTIVE/DEPLETED)
- GPS auto-detection with fallback to KL center
- Submit = `>> TRANSMIT COORDINATES`

### D. Signal Details (Student View)
- Bottom drawer with spring animation
- Food name in glitch text effect
- Time since detection ("10 MINS AGO")
- `[ ENGAGE ROUTE ]` → Waze (mobile) / Google Maps (desktop)

---

## 🗄️ Database Schema

```sql
CREATE TABLE mosques (
  id           INT8 PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name         TEXT NOT NULL,
  lat          FLOAT8 NOT NULL,
  lng          FLOAT8 NOT NULL,
  food_desc    TEXT NOT NULL,
  pax          INT4 DEFAULT 0,
  status       TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'FINISHED')),
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE mosques ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"   ON mosques FOR SELECT USING (true);
CREATE POLICY "Public insert" ON mosques FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON mosques FOR UPDATE USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE mosques;
```

---

## 🧪 Demo Mode

The app works **without Supabase** by default. When `NEXT_PUBLIC_SUPABASE_URL` is empty, it uses 6 hardcoded KL mosque locations as mock data. This means:
- Demo video can be recorded immediately
- No database setup required for hackathon judges
- Broadcast creates local-state pins in mock mode

---

## 📁 Project Structure

```
moreh-radar/
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout + Leaflet CSS
│   │   ├── page.tsx          ← Main radar dashboard
│   │   └── globals.css       ← CRT scanlines, radar sweep, neon pulse
│   ├── components/
│   │   ├── Map.tsx           ← Leaflet map (dynamic import, no SSR)
│   │   ├── BroadcastModal.tsx ← PIN auth + broadcast form
│   │   ├── SignalDrawer.tsx  ← Signal detail drawer
│   │   ├── TopBar.tsx        ← Header with animated counter
│   │   └── BottomTicker.tsx  ← Scrolling signal marquee
│   └── lib/
│       └── supabase.ts       ← Client + types + mock data
└── .env.local                ← Supabase keys (empty = mock mode)
```

---

## ✅ Definition of Done

- [x] Map loads without login on mobile
- [x] Dark tactical aesthetic with CRT scanlines and radar sweep
- [x] Green pulsing pins for active signals
- [x] Grey hollow pins for depleted signals
- [x] Tap pin → Signal details drawer with ENGAGE ROUTE
- [x] Broadcast button → PIN auth → Form → New pin on map
- [x] Bottom ticker scrolling with live signal updates
- [x] Animated meal counter in top bar
- [x] Works in demo mode without Supabase

---

*Built for Krackathon Q1 2026 · Moreh Radar · Kill Hunger. Kill Waste.*
