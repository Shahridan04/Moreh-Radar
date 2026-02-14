'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { RadioTower, Plus, Map, List, SlidersHorizontal } from 'lucide-react'
import { supabase, MOCK_MOSQUES, type Mosque } from '@/lib/supabase'
import TopBar from '@/components/TopBar'
import BottomTicker from '@/components/BottomTicker'
import BroadcastModal from '@/components/BroadcastModal'
import SignalDrawer from '@/components/SignalDrawer'
import StatsBar from '@/components/StatsBar'
import ListView from '@/components/ListView'
import LandingPage from '@/components/LandingPage'

// Dynamic import for Leaflet — NO SSR
const RadarMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto" />
        <p className="text-green-500/50 text-xs uppercase tracking-widest">
          Initializing Radar...
        </p>
      </div>
    </div>
  ),
})

// Rezeki Alert — browser notification
function sendRezekiAlert(mosque: Mosque) {
  if (typeof window === 'undefined') return
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  new Notification('🟢 Rezeki Alert!', {
    body: `${mosque.name} baru siar ${mosque.food_desc} (${mosque.pax} pax)!`,
    icon: '/favicon.ico',
    tag: `moreh-${mosque.id}`,
  })
}

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [broadcastOpen, setBroadcastOpen] = useState(false)
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [maxDistance, setMaxDistance] = useState(15) // km
  const [showFilter, setShowFilter] = useState(false)
  const prevMosqueIdsRef = useRef<Set<number>>(new Set())

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Load mosques — Supabase or mock data
  const loadMosques = useCallback(async () => {
    let newData: Mosque[] = []

    if (supabase) {
      const { data, error } = await supabase
        .from('mosques')
        .select('*')
        .order('last_updated', { ascending: false })

      if (!error && data && data.length > 0) {
        newData = data as Mosque[]
      } else {
        newData = MOCK_MOSQUES
      }
    } else {
      newData = MOCK_MOSQUES
    }

    // Check for NEW active signals → send notification
    const prevIds = prevMosqueIdsRef.current
    if (prevIds.size > 0) {
      newData.forEach((m) => {
        if (m.status === 'ACTIVE' && !prevIds.has(m.id)) {
          sendRezekiAlert(m)
        }
      })
    }
    prevMosqueIdsRef.current = new Set(newData.map((m) => m.id))

    setMosques(newData)
    setIsLoading(false)
  }, [])

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setUserLocation([3.1390, 101.6869])
      )
    }
  }, [])

  // Load data + subscribe to realtime
  useEffect(() => {
    loadMosques()

    if (supabase) {
      const channel = supabase
        .channel('mosques_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'mosques' },
          async () => await loadMosques()
        )
        .subscribe()

      return () => {
        supabase!.removeChannel(channel)
      }
    }
  }, [loadMosques])

  // Handle marking a mosque as finished
  const handleMarkFinished = async (mosqueId: number) => {
    if (supabase) {
      await supabase
        .from('mosques')
        .update({ status: 'FINISHED', pax: 0, last_updated: new Date().toISOString() })
        .eq('id', mosqueId)
    } else {
      setMosques((prev) =>
        prev.map((m) =>
          m.id === mosqueId
            ? { ...m, status: 'FINISHED' as const, pax: 0, last_updated: new Date().toISOString() }
            : m
        )
      )
    }
    setSelectedMosque(null)
  }

  // Handle claim (On My Way)
  const handleClaim = async (mosqueId: number) => {
    if (supabase) {
      // Decrement pax by 1
      const mosque = mosques.find((m) => m.id === mosqueId)
      if (mosque && mosque.pax > 0) {
        await supabase
          .from('mosques')
          .update({ pax: mosque.pax - 1 })
          .eq('id', mosqueId)
      }
    } else {
      setMosques((prev) =>
        prev.map((m) =>
          m.id === mosqueId && m.pax > 0
            ? { ...m, pax: m.pax - 1 }
            : m
        )
      )
    }
  }

  // Handle new broadcast
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBroadcast = async (newMosque: any) => {
    if (supabase) {
      await supabase.from('mosques').insert({
        name: newMosque.name,
        lat: newMosque.lat,
        lng: newMosque.lng,
        food_desc: newMosque.food_desc,
        pax: newMosque.pax,
        status: newMosque.status,
        last_updated: new Date().toISOString(),
      })
    } else {
      const mockMosque: Mosque = {
        id: Date.now(),
        name: newMosque.name,
        lat: newMosque.lat,
        lng: newMosque.lng,
        food_desc: newMosque.food_desc,
        pax: newMosque.pax,
        status: newMosque.status,
        last_updated: new Date().toISOString(),
      }
      setMosques((prev) => [mockMosque, ...prev])
    }
  }

  const activeCount = mosques.filter((m) => m.status === 'ACTIVE').length
  const totalPax = mosques
    .filter((m) => m.status === 'ACTIVE')
    .reduce((sum, m) => sum + m.pax, 0)
  const totalMealsSaved = mosques.reduce((sum, m) => sum + m.pax, 0)

  // Show landing page first
  if (showLanding) {
    return (
      <LandingPage
        onEnter={() => {
          setShowLanding(false)
        }}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          >
            <div className="w-20 h-20 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-green-500 text-sm uppercase tracking-widest">
              Scanning for Rezeki...
            </p>
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
              Moreh Radar v1.0
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 relative flex flex-col">
      {/* Top Bar */}
      <TopBar mealsDetected={totalPax} activeCount={activeCount} />

      {/* Stats Bar */}
      <StatsBar
        totalMealsSaved={totalMealsSaved}
        activeMosques={activeCount}
        totalActivePax={totalPax}
      />

      {/* View Toggle + Filter (below stats) */}
      <div className="fixed top-[94px] left-0 right-0 z-[740] px-3 py-2 flex items-center justify-between">
        {/* Map/List Toggle */}
        <div className="flex bg-zinc-900/90 border border-zinc-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'map'
              ? 'bg-green-500/20 text-green-400'
              : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            <Map className="w-3.5 h-3.5" />
            Peta
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'list'
              ? 'bg-green-500/20 text-green-400'
              : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            <List className="w-3.5 h-3.5" />
            Senarai
          </button>
        </div>

        {/* Distance Filter Toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold transition-all ${showFilter
            ? 'bg-green-500/20 border-green-500/30 text-green-400'
            : 'bg-zinc-900/90 border-zinc-700 text-zinc-500'
            }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {maxDistance}km
        </button>
      </div>

      {/* Distance Filter Slider */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[132px] left-3 right-3 z-[735] glass-panel rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-xs">Jarak Maksimum</span>
              <span className="text-green-400 text-sm font-bold">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
              className="w-full accent-green-500 h-2"
            />
            <div className="flex justify-between text-zinc-600 text-[10px]">
              <span>1 km</span>
              <span>25 km</span>
              <span>50 km</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 pt-[130px] pb-[72px]">
        {viewMode === 'map' ? (
          <div className="w-full h-full">
            <RadarMap
              mosques={mosques}
              userLocation={userLocation}
              onPinClick={(mosque) => setSelectedMosque(mosque)}
              selectedMosque={selectedMosque}
            />
          </div>
        ) : (
          <ListView
            mosques={mosques}
            userLocation={userLocation}
            onSelectMosque={(mosque) => setSelectedMosque(mosque)}
            maxDistance={maxDistance}
          />
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[800] glass-panel border-t border-green-500/20">
        <BottomTicker mosques={mosques} />
        <div className="px-4 pb-4 pt-1">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', damping: 20 }}
            onClick={() => setBroadcastOpen(true)}
            className="w-full py-4 broadcast-btn bg-green-500 hover:bg-green-400 text-black rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            style={{ minHeight: '56px' }}
          >
            <Plus className="w-6 h-6 stroke-[3]" />
            <span className="text-base font-bold uppercase tracking-wide">
              Siar Makanan
            </span>
            <RadioTower className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Broadcast Modal */}
      <BroadcastModal
        isOpen={broadcastOpen}
        onClose={() => setBroadcastOpen(false)}
        onSubmit={handleBroadcast}
        userLocation={userLocation}
      />

      {/* Signal Details Drawer */}
      {selectedMosque && (
        <SignalDrawer
          mosque={selectedMosque}
          onClose={() => setSelectedMosque(null)}
          onMarkFinished={handleMarkFinished}
          onClaim={handleClaim}
        />
      )}
    </div>
  )
}
