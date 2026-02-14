'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    Radio,
    MapPin,
    CheckCircle2,
    Utensils,
    Users,
    Building2,
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import type { Mosque } from '@/lib/supabase'

type BroadcastModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (mosque: Omit<Mosque, 'id' | 'last_updated'> & { posted_by_name?: string; posted_by_email?: string }) => void
    userLocation: [number, number] | null
}

export default function BroadcastModal({
    isOpen,
    onClose,
    onSubmit,
    userLocation,
}: BroadcastModalProps) {
    const { user, signInWithGoogle } = useAuth()
    const [step, setStep] = useState<'auth' | 'form' | 'success'>('auth')
    const [formData, setFormData] = useState({
        name: '',
        food_desc: '',
        pax: 50,
        status: 'ACTIVE' as 'ACTIVE' | 'FINISHED',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Auto-advance to form if user is already logged in
    const currentStep = user ? (step === 'auth' ? 'form' : step) : 'auth'

    const handleFormSubmit = useCallback(async () => {
        if (!formData.name || !formData.food_desc) return
        setIsSubmitting(true)

        const loc = userLocation || [3.1390, 101.6869]
        onSubmit({
            name: formData.name.toUpperCase(),
            food_desc: formData.food_desc,
            pax: formData.pax,
            status: formData.status,
            lat: loc[0],
            lng: loc[1],
            posted_by_name: user?.user_metadata?.full_name || user?.email || 'Anonymous',
            posted_by_email: user?.email || '',
        })

        setIsSubmitting(false)
        setStep('success')

        // Auto-close after success
        setTimeout(() => {
            setStep('auth')
            setFormData({ name: '', food_desc: '', pax: 50, status: 'ACTIVE' })
            onClose()
        }, 2000)
    }, [formData, userLocation, user, onSubmit, onClose])

    const handleClose = () => {
        setStep('auth')
        setFormData({ name: '', food_desc: '', pax: 50, status: 'ACTIVE' })
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.85)' }}
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="glass-panel w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-5 sm:px-6 sm:py-5 border-b border-green-500/20 sticky top-0 glass-panel z-10">
                            <div className="flex items-center gap-2">
                                <Radio className="w-5 h-5 text-green-500" />
                                <span className="text-green-500 text-sm uppercase tracking-wider font-bold">
                                    {currentStep === 'success' ? 'Berjaya!' : 'Siar Makanan'}
                                </span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-zinc-500 hover:text-green-500 transition-colors p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* === AUTH STEP === */}
                        {currentStep === 'auth' && (
                            <div className="px-6 py-8 sm:px-8 sm:py-10 space-y-8">
                                <div className="text-center space-y-5">
                                    <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                                        <Utensils className="w-8 h-8 text-green-500" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-green-400 text-lg">
                                            Nak siar makanan?
                                        </h3>
                                        <p className="text-zinc-500 text-sm">
                                            Log masuk untuk kongsi makanan dengan komuniti
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={signInWithGoogle}
                                    className="w-full py-5 bg-white text-black rounded-xl text-base font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors active:scale-[0.98] px-6"
                                    style={{ minHeight: '56px' }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Log Masuk dengan Google
                                </button>

                                <p className="text-zinc-600 text-[11px] text-center pt-2">
                                    Tak perlu daftar. Tekan sahaja untuk log masuk.
                                </p>
                            </div>
                        )}

                        {/* === FORM STEP === */}
                        {currentStep === 'form' && (
                            <div className="px-6 py-8 sm:px-8 sm:py-8 space-y-6">
                                {/* Logged in user indicator */}
                                {user && (
                                    <div className="flex items-center gap-3 bg-green-500/5 border border-green-500/20 rounded-xl p-3">
                                        {user.user_metadata?.avatar_url ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={user.user_metadata.avatar_url}
                                                alt=""
                                                className="w-8 h-8 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-sm font-bold">
                                                {(user.user_metadata?.full_name || user.email || '?')[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-green-400 text-sm truncate">
                                                {user.user_metadata?.full_name || user.email}
                                            </p>
                                            <p className="text-zinc-600 text-[10px]">Log masuk ✓</p>
                                        </div>
                                    </div>
                                )}

                                {/* Mosque Name */}
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-green-500" />
                                        Nama Masjid / Surau
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full bg-zinc-900/80 border border-green-500/20 rounded-xl px-4 py-4 text-green-400 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700"
                                        placeholder="cth: Masjid Al-Falah, USJ"
                                        style={{ minHeight: '52px', fontSize: '16px' }}
                                    />
                                </div>

                                {/* Food Type */}
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm flex items-center gap-2">
                                        <Utensils className="w-4 h-4 text-green-500" />
                                        Jenis Makanan
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.food_desc}
                                        onChange={(e) =>
                                            setFormData({ ...formData, food_desc: e.target.value })
                                        }
                                        className="w-full bg-zinc-900/80 border border-green-500/20 rounded-xl px-4 py-4 text-green-400 text-base focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700"
                                        placeholder="cth: Nasi Lemak, Ayam Rendang"
                                        style={{ minHeight: '52px', fontSize: '16px' }}
                                    />
                                </div>

                                {/* Pax — Big slider-like buttons */}
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm flex items-center gap-2">
                                        <Users className="w-4 h-4 text-green-500" />
                                        Berapa Orang (Pax)?
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[20, 50, 100, 200].map((val) => (
                                            <button
                                                key={val}
                                                onClick={() => setFormData({ ...formData, pax: val })}
                                                className={`py-4 rounded-xl text-base font-bold border transition-all active:scale-95 ${formData.pax === val
                                                        ? 'bg-green-500/20 border-green-500 text-green-400'
                                                        : 'bg-zinc-900/50 border-zinc-700 text-zinc-500'
                                                    }`}
                                                style={{ minHeight: '52px' }}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Custom input */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-600 text-xs">Atau taip:</span>
                                        <input
                                            type="number"
                                            value={formData.pax}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    pax: parseInt(e.target.value) || 0,
                                                })
                                            }
                                            className="w-24 bg-zinc-900/80 border border-green-500/20 rounded-lg px-3 py-2 text-green-400 text-base text-center focus:outline-none focus:border-green-500"
                                            min={0}
                                        />
                                        <span className="text-zinc-600 text-xs">orang</span>
                                    </div>
                                </div>

                                {/* Status — Big colorful cards */}
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm">
                                        Status Makanan
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() =>
                                                setFormData({ ...formData, status: 'ACTIVE' })
                                            }
                                            className={`p-4 rounded-xl border-2 transition-all text-center active:scale-95 ${formData.status === 'ACTIVE'
                                                    ? 'bg-green-500/15 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                                                    : 'bg-zinc-900/50 border-zinc-700'
                                                }`}
                                            style={{ minHeight: '64px' }}
                                        >
                                            <div
                                                className={`text-2xl mb-1 ${formData.status === 'ACTIVE' ? 'text-green-400' : 'text-zinc-600'}`}
                                            >
                                                ✅
                                            </div>
                                            <div
                                                className={`text-sm font-bold ${formData.status === 'ACTIVE' ? 'text-green-400' : 'text-zinc-600'}`}
                                            >
                                                Ada Lagi
                                            </div>
                                        </button>
                                        <button
                                            onClick={() =>
                                                setFormData({ ...formData, status: 'FINISHED' })
                                            }
                                            className={`p-4 rounded-xl border-2 transition-all text-center active:scale-95 ${formData.status === 'FINISHED'
                                                    ? 'bg-red-500/15 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                                                    : 'bg-zinc-900/50 border-zinc-700'
                                                }`}
                                            style={{ minHeight: '64px' }}
                                        >
                                            <div
                                                className={`text-2xl mb-1 ${formData.status === 'FINISHED' ? 'text-red-400' : 'text-zinc-600'}`}
                                            >
                                                ❌
                                            </div>
                                            <div
                                                className={`text-sm font-bold ${formData.status === 'FINISHED' ? 'text-red-400' : 'text-zinc-600'}`}
                                            >
                                                Habis
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Location indicator */}
                                <div className="flex items-center gap-2 text-zinc-500 text-xs bg-zinc-900/50 rounded-lg p-3">
                                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    {userLocation
                                        ? `📍 Lokasi anda dikesan`
                                        : '📍 Lokasi tidak tersedia — guna pusat KL'}
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleFormSubmit}
                                    disabled={
                                        isSubmitting || !formData.name || !formData.food_desc
                                    }
                                    className="w-full py-4 bg-green-500 text-black rounded-xl text-lg font-bold tracking-wide hover:bg-green-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
                                    style={{ minHeight: '56px' }}
                                >
                                    {isSubmitting ? 'Menghantar...' : '📢 Hantar Sekarang'}
                                </button>
                            </div>
                        )}

                        {/* === SUCCESS STEP === */}
                        {currentStep === 'success' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-8 text-center space-y-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        damping: 10,
                                        stiffness: 200,
                                        delay: 0.1,
                                    }}
                                >
                                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                                </motion.div>
                                <h3 className="text-green-400 text-xl font-bold">
                                    Berjaya! ✨
                                </h3>
                                <p className="text-zinc-400 text-sm">
                                    Makanan anda telah disiarkan di radar.
                                    <br />
                                    Pelajar berhampiran akan dapat melihatnya.
                                </p>
                                <div className="text-zinc-600 text-xs">
                                    Menutup secara automatik...
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
