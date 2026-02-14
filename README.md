# 🕌 Moreh Radar
### *Kill Hunger. Kill Waste. Connect leftovers to hungry students — instantly.*

> **Krackathon Q1 2026 Submission** · Prompt 01: Digital Community Utility
> **AI Tools Used:** Claude (architecture planning, code scaffolding), Cursor (development)

---

## 🎯 The Problem

Every night during Ramadan, mosques across Malaysia cook for hundreds. But attendance is unpredictable.

**The result?** Tonnes of perfectly good food — Nasi Lemak, Bihun Goreng, Karipap — get thrown away. Meanwhile, 10 minutes away, a broke university student is deciding whether RM15 supper is worth it.

This is a **coordination failure**, not a food shortage. And it's solvable with a single web link.

---

## 💡 The Solution

**Moreh Radar** is a zero-friction, real-time food availability map for Ramadan Moreh (supper) events at mosques.

- **Students** open a link → see a map with green pins → walk to free food.
- **Mosque admins (AJK)** tap "+" → fill a 10-second form → broadcast food availability to the community instantly.
- When food runs out → toggle "Finished" → pin turns grey → no wasted trips.

**No login. No app install. Just a URL.**

---

## 👥 Who It's For

| User | Pain | Solution |
|------|------|----------|
| **Ali** (Broke Student) | "Bazaar Ramadan is RM15 minimum. I'm hungry but broke." | Real-time map showing free food nearby |
| **Pak Cik Rahim** (AJK Masjid) | "We cooked for 100, only 50 came. I hate throwing food away." | One-tap broadcast to the whole community |

---

## ✨ Features

### P0 — Core (Live)
- 🗺️ **Hunger Map** — Leaflet.js map showing your location + nearby active mosque pins
- 📍 **Live Pins** — Green = food available, Grey = finished
- ➕ **Admin Broadcast Form** — Post food in under 10 seconds (name, food type, quantity)
- 🔄 **Real-time Updates** — Supabase Realtime subscription; pin appears on all devices instantly
- ✅ **Status Toggle** — AJK marks "Finished" when food is gone

### P1 — Nice to Have
- 🧭 **"Drive There"** — One-tap Waze/Google Maps navigation
- 🙋 **"I'm Coming"** counter — Students claim a spot, creating urgency

---

## 🏗️ Technical Stack

```
Frontend:   Next.js 14 (App Router) + Tailwind CSS
Map:        Leaflet.js + React-Leaflet
Backend:    Supabase (PostgreSQL + Realtime subscriptions)
Hosting:    Vercel (free tier)
Auth:       None (PIN-based admin access for MVP)
Budget:     RM 0
```

### Database Schema

```sql
CREATE TABLE food_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mosque_name TEXT NOT NULL,
  food_desc   TEXT NOT NULL,
  quantity    TEXT CHECK (quantity IN ('Low', 'Medium', 'High')),
  lat         DECIMAL(9,6) NOT NULL,
  lng         DECIMAL(9,6) NOT NULL,
  status      TEXT DEFAULT 'available' CHECK (status IN ('available', 'finished')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE food_posts;
```

---

## 🚀 Getting Started

```bash
# 1. Clone and install
git clone https://github.com/yourusername/moreh-radar
cd moreh-radar
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Add your Supabase URL and anon key

# 3. Run locally
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📱 User Journey

```
[Student]
Opens link → Map loads (no login) → Sees green pin nearby
→ Taps pin → "Masjid Al-Falah: Bihun Goreng, 30 pax"
→ Taps "Drive There" → Arrives → Eats → 

[AJK Admin]
Taps "+" → Enters PIN → Fills form (10 seconds)
→ Taps "Post" → Green pin appears on ALL devices live
→ Food finishes → Taps "Mark as Finished" → Pin goes grey
```

---

## 🎨 Design Philosophy

**Islamic, Clean, Urgent.**

- 🟢 **Green** = Food Available. GO.
- ⚫ **Grey** = Finished. Stop.
- **Big buttons** — easy to tap with oily fingers after Moreh
- **Mobile-first** — assumes users are on their phone, in the dark, hungry

---

## 📊 Success Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Live deployment URL | ✅ Working | `moreh-radar.vercel.app` |
| Map load time | < 2 seconds | ✅ |
| Post → pin appears | < 1 second | ✅ Real-time |
| Mobile usability | No scroll issues | ✅ |
| Zero login friction | No sign-up required | ✅ |

---

## 🌍 Community Impact

**Problem scale:**
- ~6,000+ mosques in Malaysia
- Ramadan runs ~30 nights/year
- Conservative estimate: 50+ pax worth of food wasted per mosque per night
- = **~9 million person-meals** of potential food waste, annually

**Moreh Radar addresses:**
- ✅ **SDG 2** — Zero Hunger
- ✅ **SDG 12** — Responsible Consumption (Reduce Food Waste)
- ✅ **SDG 11** — Sustainable Cities and Communities

---

## 🗺️ Deployment Plan

**Phase 1 (Tonight):** Single URL, hardcoded demo mosques in KL  
**Phase 2 (Next Ramadan):** Partner with 5 mosques in Petaling Jaya for pilot  
**Phase 3 (Scale):** Open registration for any mosque in Malaysia via WhatsApp link  
**Distribution:** Zero marketing cost — shared in university WhatsApp groups and Twitter

---

## 🤖 AI Disclosure

As required by Krackathon rules:
- **Claude** — Used for PRD drafting, architecture planning, and code structure guidance
- **Cursor** — Used for development assistance and code completion

All creative decisions, problem framing, and final implementation by the developer.

---

## 👨‍💻 Developer

Built solo during Krackathon Q1 2026 · 14 February 2026  
*"No food waste tonight."*
