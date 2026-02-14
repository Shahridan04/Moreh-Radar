# MOREH RADAR — MASTER VIBE-CODING PROMPT
Paste this into Cursor/Claude as your starting context.

---

## PROJECT BRIEF

Build a web app called **Moreh Radar** — a real-time food availability map for Ramadan Moreh (supper) events at mosques in Malaysia.

**Core Loop:**
1. Mosque admin posts "We have leftover food" in 10 seconds
2. A map pin appears instantly for all viewers
3. Hungry students see the green pin, tap "Drive There", get free food
4. Admin toggles "Finished" → pin goes grey → no wasted trips

**Tagline:** "Kill Hunger. Kill Waste."

---

## TECH STACK (DO NOT DEVIATE)

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Map:** Leaflet.js + react-leaflet
- **Backend:** Supabase (Postgres + Realtime subscriptions)
- **Deployment:** Vercel
- **Language:** TypeScript
- **Auth:** NONE. Use hardcoded PIN "1234" for admin actions only.

---

## DATABASE SCHEMA

Run this in Supabase SQL Editor before starting:

```sql
CREATE TABLE food_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mosque_name TEXT NOT NULL,
  food_desc   TEXT NOT NULL,
  quantity    TEXT CHECK (quantity IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
  lat         DECIMAL(9,6) NOT NULL,
  lng         DECIMAL(9,6) NOT NULL,
  status      TEXT DEFAULT 'available' CHECK (status IN ('available', 'finished')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE food_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"   ON food_posts FOR SELECT USING (true);
CREATE POLICY "Public insert" ON food_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON food_posts FOR UPDATE USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE food_posts;
```

---

## ENVIRONMENT VARIABLES

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## FILE STRUCTURE TO BUILD

```
moreh-radar/
├── app/
│   ├── layout.tsx          ← root layout, import leaflet CSS here
│   ├── page.tsx            ← main page (map + card list + FAB button)
│   └── globals.css         ← tailwind + custom styles
├── components/
│   ├── HungerMap.tsx       ← the Leaflet map (client component)
│   ├── PostCard.tsx        ← card shown below map for each active post
│   └── PostModal.tsx       ← the "+" modal form for admins
├── lib/
│   └── supabase.ts         ← supabase client + FoodPost type
└── .env.local
```

---

## DESIGN SYSTEM

**Colors (use these exact values in Tailwind config or inline):**
```
Background:     #0a0a0a (near black)
Card bg:        #111111
Primary green:  #22c55e  (Tailwind green-500)
Muted grey:     #6b7280  (Tailwind gray-500)
Text primary:   #f9fafb  (Tailwind gray-50)
Text secondary: #9ca3af  (Tailwind gray-400)
Accent border:  #1f2937  (Tailwind gray-800)
```

**Font:** Use `Geist` or `Inter` from next/font — clean and readable.

**Vibe:** Dark mode, Islamic-inspired calm. Not loud. Urgent but clean.
Green means GO. Grey means STOP. Everything else is black.

**Mobile-first.** All buttons minimum 48px tall. Big tap targets.

---

## COMPONENT SPECS

### `lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type FoodPost = {
  id: string
  mosque_name: string
  food_desc: string
  quantity: 'Low' | 'Medium' | 'High'
  lat: number
  lng: number
  status: 'available' | 'finished'
  created_at: string
}
```

---

### `app/layout.tsx`
- Import `leaflet/dist/leaflet.css` here at the top
- Dark background `#0a0a0a`
- Set viewport meta for mobile
- App title: "Moreh Radar"

---

### `components/HungerMap.tsx` (CLIENT COMPONENT — 'use client')

**What it does:**
- Renders a Leaflet map centered on user's GPS location
- Falls back to KL center `[3.1390, 101.6869]` if location denied
- Shows GREEN pins for `status === 'available'` posts
- Shows GREY pins for `status === 'finished'` posts
- Each pin popup shows: mosque name, food description, quantity, a "🧭 Drive There" button
- Subscribes to Supabase Realtime — map updates WITHOUT page refresh when new posts are added or status changes
- User's own location shown as a blue pulsing dot (use a custom DivIcon)

**Key implementation notes:**
- Wrap in `dynamic(() => import(...), { ssr: false })` when importing in page.tsx — Leaflet does NOT work with SSR
- Fix the broken default Leaflet icon by deleting `_getIconUrl` and merging CDN options
- Green icon URL: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png`
- Grey icon URL: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png`
- Shadow URL: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png`
- Map tile: OpenStreetMap `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

**"Drive There" button inside popup:**
```
onClick: window.open(`https://www.waze.com/ul?ll=${post.lat},${post.lng}&navigate=yes`)
```

---

### `components/PostCard.tsx`

**What it does:**
- Renders a horizontal card for each food post
- Shows: mosque name, food emoji + description, quantity badge, distance from user, status badge
- Green glowing border if available, grey if finished
- Tapping the card flies the map to that pin (use a shared state or callback)
- "Drive There" button on the right

**Card layout (mobile):**
```
┌─────────────────────────────────────────┐
│ 🕌 Masjid Al-Falah        [● AVAILABLE] │
│ 🍛 Bihun Goreng • ~30 pax               │
│ 📍 0.5 km away      [🧭 Drive There]    │
└─────────────────────────────────────────┘
```

**Distance calculation:** Use Haversine formula between user coords and post coords.

---

### `components/PostModal.tsx` (CLIENT COMPONENT — 'use client')

**What it does:**
- Triggered by the "+" FAB button on the main page
- First screen: PIN entry (4-digit input, PIN is "1234")
- Second screen (after correct PIN): the form
- On submit: inserts to Supabase, closes modal, map updates via realtime

**Form fields:**
```
Mosque Name:  [Text input — placeholder "Masjid Al-Falah, Damansara"]
Food:         [Text input — placeholder "Bihun Goreng, Karipap..."]
Quantity:     [3 buttons — Low | Medium | High — tap to select]
Location:     [Auto-filled from GPS — show "Using your current location 📍"]
              [If GPS unavailable: lat/lng manual input fields]
```

**Submit button:** "📢 Broadcast Now" — full width, green, bold

**Admin actions (show after PIN verified, for existing posts):**
- "Mark as Finished ✓" button — updates `status` to `finished`

**PIN wrong:** Show red shake animation + "Wrong PIN. Try again."

---

### `app/page.tsx`

**Layout (mobile, full viewport):**
```
┌─────────────────────────────────────┐
│  🕌 Moreh Radar        [● 3 Active] │  ← Header (fixed, ~56px)
├─────────────────────────────────────┤
│                                     │
│         MAP (60vh)                  │
│    dynamic import HungerMap         │
│                                     │
├─────────────────────────────────────┤
│  ── Active Mosques ──               │
│  [PostCard]                         │
│  [PostCard]                         │  ← Scrollable list (40vh)
│  [PostCard]                         │
└─────────────────────────────────────┘
                              [+]        ← FAB button (fixed, bottom-right)
```

**Header:**
- Left: "🕌 Moreh Radar" logo text (white, bold)
- Right: active post count badge in green, e.g. "● 3 Active"
- Dark background with subtle bottom border

**FAB Button (+):**
- Fixed position, bottom-right: `bottom-6 right-6`
- Large (64px), green circle, "+" icon or "📢" emoji
- Opens PostModal on click
- Subtle pulse animation to draw attention

**State management:**
- `posts` — array of FoodPost, fetched from Supabase + realtime updated
- `userLocation` — `[lat, lng] | null`
- `modalOpen` — boolean
- `selectedPost` — FoodPost | null (for flying map to a pin)

**On mount:**
1. Get user location via `navigator.geolocation.getCurrentPosition`
2. Fetch all posts from Supabase
3. Subscribe to realtime channel for live updates

---

## REALTIME SUBSCRIPTION PATTERN

Use this exact pattern in your useEffect:

```typescript
const channel = supabase
  .channel('food_posts_changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'food_posts' },
    async () => {
      // Re-fetch all posts on any change
      const { data } = await supabase
        .from('food_posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setPosts(data)
    }
  )
  .subscribe()

return () => { supabase.removeChannel(channel) }
```

---

## SEED DATA (for demo)

After setting up the DB, insert these rows to have pins on the map immediately:

```sql
INSERT INTO food_posts (mosque_name, food_desc, quantity, lat, lng, status) VALUES
('Masjid Al-Falah, USJ', 'Nasi Lemak + Ayam Rendang', 'High', 3.0478, 101.5765, 'available'),
('Masjid Damansara Utama', 'Bihun Goreng + Karipap', 'Medium', 3.1478, 101.6195, 'available'),
('Masjid Shah Alam', 'Roti Canai + Teh Tarik', 'Low', 3.0844, 101.5323, 'finished');
```

---

## CRITICAL RULES

1. **NO SSR for HungerMap** — always use `dynamic(() => import('../components/HungerMap'), { ssr: false })`
2. **NO login walls** — the map must load without any authentication
3. **Mobile scroll** — the map div must NOT have `overflow: hidden` on parent that blocks touch scroll
4. **Leaflet CSS** — MUST be imported in layout.tsx or the map will render without styles
5. **Realtime** — test by opening two browser tabs: post on one, see pin appear on the other

---

## DEFINITION OF DONE

- [ ] URL is live on Vercel
- [ ] Map loads on mobile without login
- [ ] At least 1 green pin visible on load (seed data)
- [ ] Tap "+" → enter PIN "1234" → fill form → tap submit → pin appears on map
- [ ] Second browser tab shows the new pin WITHOUT refreshing
- [ ] Tap "Drive There" → opens Waze with correct coordinates
- [ ] Marking "Finished" turns the pin grey

---

## DEPLOYMENT

```bash
# Push to GitHub, then:
vercel --prod

# Set env vars in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

*Built for Krackathon Q1 2026 · Moreh Radar · Kill Hunger. Kill Waste.*
