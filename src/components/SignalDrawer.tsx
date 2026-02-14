'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Navigation,
    X,
    Clock,
    Users,
    MapPin,
    AlertTriangle,
    Share2,
    CheckCircle2,
    Car,
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import type { Mosque } from '@/lib/supabase'

type SignalDrawerProps = {
    mosque: Mosque | null
    onClose: () => void
    onMarkFinished: (mosqueId: number) => void
    onClaim: (mosqueId: number) => void
}

function timeAgo(dateString: string): string {
    const now = Date.now()
    const then = new Date(dateString).getTime()
    const diff = Math.floor((now - then) / 60000)
    if (diff < 1) return 'BARU SAHAJA'
    if (diff < 60) return `${diff} MINIT LALU`
    const hours = Math.floor(diff / 60)
    if (hours < 24) return `${hours} JAM LALU`
    return `${Math.floor(hours / 24)} HARI LALU`
}

function getClaimedIds(): number[] {
    if (typeof window === 'undefined') return []
    try {
        return JSON.parse(localStorage.getItem('moreh_claimed') || '[]')
    } catch {
        return []
    }
}

function setClaimed(id: number) {
    const claimed = getClaimedIds()
    if (!claimed.includes(id)) {
        claimed.push(id)
        localStorage.setItem('moreh_claimed', JSON.stringify(claimed))
    }
}

export default function SignalDrawer({
    mosque,
    onClose,
    onMarkFinished,
    onClaim,
}: SignalDrawerProps) {
    const { user } = useAuth()
    const [hasClaimed, setHasClaimed] = useState(false)
    const [showClaimSuccess, setShowClaimSuccess] = useState(false)

    useEffect(() => {
        if (mosque) {
            setHasClaimed(getClaimedIds().includes(mosque.id))
            setShowClaimSuccess(false)
        }
    }, [mosque])

    if (!mosque) return null

    const handleClaim = () => {
        if (hasClaimed) return
        setClaimed(mosque.id)
        setHasClaimed(true)
        setShowClaimSuccess(true)
        onClaim(mosque.id)

        // Open navigation
        const wazeUrl = `https://www.waze.com/ul?ll=${mosque.lat},${mosque.lng}&navigate=yes`
        const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}`
        if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
            window.open(wazeUrl, '_blank')
        } else {
            window.open(gmapsUrl, '_blank')
        }

        setTimeout(() => setShowClaimSuccess(false), 3000)
    }

    const handleWhatsAppShare = () => {
        const text = `🕌 ${mosque.name} ada ${mosque.food_desc} untuk ${mosque.pax} orang!\n\n📍 Pergi sekarang: https://www.waze.com/ul?ll=${mosque.lat},${mosque.lng}&navigate=yes\n\n🟢 Moreh Radar — Kill Hunger. Kill Waste.`
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
    }

    // Simulated OTW count (in production, this would come from DB)
    const otwCount = hasClaimed
        ? Math.floor(Math.random() * 4) + 1
        : Math.floor(Math.random() * 3)

    return (
        <AnimatePresence>
            <motion.div
                key={mosque.id}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-[900] glass-panel rounded-t-2xl"
            >
                {/* Drag Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1.5 bg-zinc-600 rounded-full" />
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-zinc-500 hover:text-green-500 transition-colors p-2"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="px-5 pb-6 pt-2 space-y-3">
                    {/* Status badge */}
                    <div className="flex items-center gap-2">
                        {mosque.status === 'ACTIVE' ? (
                            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-green-500 text-xs uppercase tracking-wider font-bold">
                                    Ada Makanan
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                                <span className="text-zinc-500 text-xs uppercase tracking-wider font-bold">
                                    Habis
                                </span>
                            </div>
                        )}

                        {/* OTW badge */}
                        {mosque.status === 'ACTIVE' && otwCount > 0 && (
                            <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1.5 rounded-full">
                                <Car className="w-3 h-3 text-amber-500" />
                                <span className="text-amber-500 text-[10px] font-bold">
                                    {otwCount} sedang menuju
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Food Name */}
                    <h2 className="text-2xl text-green-400 font-bold tracking-wide">
                        {mosque.food_desc}
                    </h2>

                    {/* Mosque Name */}
                    <div className="flex items-center gap-2 text-zinc-300 text-sm">
                        <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{mosque.name}</span>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-4 bg-zinc-900/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-zinc-300 text-sm">
                            <Users className="w-4 h-4 text-green-500" />
                            <span>
                                {mosque.status === 'ACTIVE'
                                    ? `${mosque.pax} orang`
                                    : 'Habis'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300 text-sm">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span>{timeAgo(mosque.last_updated)}</span>
                        </div>
                    </div>

                    {/* Claim success message */}
                    <AnimatePresence>
                        {showClaimSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3"
                            >
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span className="text-green-400 text-sm">
                                    Anda telah didaftarkan! Selamat menjamu selera 🤲
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-1">
                        {mosque.status === 'ACTIVE' ? (
                            <>
                                {/* Navigate / Claim Button */}
                                <button
                                    onClick={handleClaim}
                                    disabled={hasClaimed}
                                    className={`w-full py-4 rounded-xl uppercase text-base font-bold tracking-wider flex items-center justify-center gap-3 active:scale-[0.98] transition-all ${hasClaimed
                                            ? 'bg-green-500/20 text-green-400 border-2 border-green-500/30'
                                            : 'bg-green-500 text-black hover:bg-green-400'
                                        }`}
                                    style={{ minHeight: '56px' }}
                                >
                                    {hasClaimed ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            Sudah Didaftarkan ✓
                                        </>
                                    ) : (
                                        <>
                                            <Navigation className="w-5 h-5" />
                                            Saya Nak Pergi! 🚗
                                        </>
                                    )}
                                </button>

                                {/* Share + Admin row */}
                                <div className="flex gap-2">
                                    {/* WhatsApp Share */}
                                    <button
                                        onClick={handleWhatsAppShare}
                                        className="flex-1 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-all active:scale-[0.98]"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        WhatsApp
                                    </button>

                                    {/* Mark as Finished — logged in only */}
                                    {user && (
                                        <button
                                            onClick={() => onMarkFinished(mosque.id)}
                                            className="flex-1 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all active:scale-[0.98]"
                                        >
                                            <AlertTriangle className="w-4 h-4" />
                                            Habis
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full py-4 bg-zinc-800 text-zinc-500 rounded-xl uppercase text-sm text-center tracking-wider border border-zinc-700">
                                Makanan telah habis
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
