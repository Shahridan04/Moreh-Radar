import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export type Mosque = {
  id: number
  name: string
  lat: number
  lng: number
  food_desc: string
  pax: number
  status: 'ACTIVE' | 'FINISHED'
  last_updated: string
}

// Mock data for demo mode — real KL mosque locations
export const MOCK_MOSQUES: Mosque[] = [
  {
    id: 1,
    name: 'MASJID WILAYAH PERSEKUTUAN',
    lat: 3.1710,
    lng: 101.6935,
    food_desc: 'Nasi Lemak + Ayam Rendang',
    pax: 120,
    status: 'ACTIVE',
    last_updated: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: 2,
    name: 'MASJID NEGARA',
    lat: 3.1415,
    lng: 101.6919,
    food_desc: 'Bihun Goreng + Karipap',
    pax: 80,
    status: 'ACTIVE',
    last_updated: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: 3,
    name: 'SURAU KLCC',
    lat: 3.1577,
    lng: 101.7119,
    food_desc: 'Mee Goreng Mamak + Teh Tarik',
    pax: 50,
    status: 'ACTIVE',
    last_updated: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 4,
    name: 'MASJID AS-SYAKIRIN',
    lat: 3.1558,
    lng: 101.7137,
    food_desc: 'Roti Canai + Dal',
    pax: 200,
    status: 'ACTIVE',
    last_updated: new Date(Date.now() - 3 * 60000).toISOString(),
  },
  {
    id: 5,
    name: 'SURAU BANGSAR',
    lat: 3.1300,
    lng: 101.6710,
    food_desc: 'Nasi Briyani Kambing',
    pax: 0,
    status: 'FINISHED',
    last_updated: new Date(Date.now() - 90 * 60000).toISOString(),
  },
  {
    id: 6,
    name: 'MASJID JAMEK',
    lat: 3.1491,
    lng: 101.6945,
    food_desc: 'Bubur Lambuk + Kuih Muih',
    pax: 30,
    status: 'ACTIVE',
    last_updated: new Date(Date.now() - 15 * 60000).toISOString(),
  },
]
