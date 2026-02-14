'use client'

import { motion } from 'framer-motion'
import { Navigation, MapPin, Users, Clock, MessageCircle } from 'lucide-react'
import type { Mosque } from '@/lib/supabase'

type ListViewProps = {
    mosques: Mosque[]
    userLocation: [number, number] | null
    onSelectMosque: (mosque: Mosque) => void
    maxDistance: number // km
}

// Haversine distance in km
function getDistanceKm(
    lat1: number, lng1: number,
    lat2: number, lng2: number
): number {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

function timeAgoShort(dateString: string): string {
    const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
    if (diff < 1) return 'Baru'
    if (diff < 60) return `${diff}m`
    return `${Math.floor(diff / 60)}j`
}

export default function ListView({
    mosques,
    userLocation,
    onSelectMosque,
    maxDistance,
}: ListViewProps) {
    // Calculate distances and sort
    const mosquesWithDistance = mosques
        .map((m) => ({
            ...m,
            distance: userLocation
                ? getDistanceKm(userLocation[0], userLocation[1], m.lat, m.lng)
                : null,
        }))
        .filter((m) => {
            if (!m.distance) return true
            return m.distance <= maxDistance
        })
        .sort((a, b) => {
            // Active first, then by distance
            if (a.status !== b.status) {
                return a.status === 'ACTIVE' ? -1 : 1
            }
            if (a.distance && b.distance) return a.distance - b.distance
            return 0
        })

    if (mosquesWithDistance.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center space-y-3">
                    <div className="text-4xl">📡</div>
                    <p className="text-zinc-500 text-sm">
                        Tiada signal dalam jarak {maxDistance}km
                    </p>
                    <p className="text-zinc-600 text-xs">
                        Cuba tambah jarak carian
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto space-y-2 p-3">
            {mosquesWithDistance.map((mosque, i) => (
                <motion.button
                    key={mosque.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => onSelectMosque(mosque)}
                    className={`w-full text-left p-4 rounded-xl border transition-all active:scale-[0.98] ${mosque.status === 'ACTIVE'
                            ? 'glass-panel border-green-500/20 hover:border-green-500/40'
                            : 'bg-zinc-900/50 border-zinc-800 opacity-60'
                        }`}
                >
                    <div className="flex items-start justify-between gap-3">
                        {/* Left content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                            {/* Status + Name */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${mosque.status === 'ACTIVE'
                                            ? 'bg-green-500 animate-pulse'
                                            : 'bg-zinc-600'
                                        }`}
                                />
                                <span
                                    className={`text-sm font-bold truncate ${mosque.status === 'ACTIVE' ? 'text-green-400' : 'text-zinc-500'
                                        }`}
                                >
                                    {mosque.name}
                                </span>
                            </div>

                            {/* Food */}
                            <p className="text-zinc-300 text-sm pl-4.5">
                                🍛 {mosque.food_desc}
                            </p>

                            {/* Meta row */}
                            <div className="flex items-center gap-3 pl-4.5">
                                <span className="flex items-center gap-1 text-zinc-500 text-xs">
                                    <Users className="w-3 h-3" />
                                    {mosque.pax} pax
                                </span>
                                <span className="flex items-center gap-1 text-zinc-500 text-xs">
                                    <Clock className="w-3 h-3" />
                                    {timeAgoShort(mosque.last_updated)}
                                </span>
                                {mosque.distance !== null && (
                                    <span className="flex items-center gap-1 text-zinc-500 text-xs">
                                        <MapPin className="w-3 h-3" />
                                        {mosque.distance < 1
                                            ? `${Math.round(mosque.distance * 1000)}m`
                                            : `${mosque.distance.toFixed(1)}km`}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Right: Quick navigate */}
                        {mosque.status === 'ACTIVE' && (
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center">
                                    <Navigation className="w-4 h-4 text-green-500" />
                                </div>
                                {mosque.distance !== null && (
                                    <span className="text-green-500 text-[10px] font-bold">
                                        {mosque.distance < 1
                                            ? `${Math.round(mosque.distance * 1000)}m`
                                            : `${mosque.distance.toFixed(1)}km`}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* OTW indicator */}
                    {mosque.status === 'ACTIVE' && (
                        <div className="flex items-center gap-1.5 mt-2 pl-4.5">
                            <MessageCircle className="w-3 h-3 text-amber-500" />
                            <span className="text-amber-500/70 text-[10px]">
                                {Math.floor(Math.random() * 5)} orang sedang menuju
                            </span>
                        </div>
                    )}
                </motion.button>
            ))}
        </div>
    )
}
