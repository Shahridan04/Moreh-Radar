'use client'

import { useEffect, useState } from 'react'
import { Radar, Wifi, LogOut, User } from 'lucide-react'
import { useAuth } from '@/lib/auth'

type TopBarProps = {
    mealsDetected: number
    activeCount: number
}

export default function TopBar({ mealsDetected, activeCount }: TopBarProps) {
    const { user, signInWithGoogle, signOut } = useAuth()
    const [displayCount, setDisplayCount] = useState(0)

    // Animate counter up
    useEffect(() => {
        const target = mealsDetected
        const duration = 2000
        const start = displayCount
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - (1 - progress) * (1 - progress)
            setDisplayCount(Math.floor(start + (target - start) * eased))
            if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mealsDetected])

    return (
        <div className="fixed top-0 left-0 right-0 z-[800] glass-panel px-4 py-3 flex items-center justify-between">
            {/* Left: System Title */}
            <div className="flex items-center gap-2">
                <Radar className="w-5 h-5 text-green-500" />
                <span className="text-green-500 text-sm uppercase tracking-wider font-bold">
                    Moreh Radar
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            {/* Right: Stats + User */}
            <div className="flex items-center gap-3">
                {/* Stats */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs">
                    <Wifi className="w-3 h-3 text-green-500" />
                    <span className="text-green-500 font-bold">
                        {displayCount.toLocaleString()}
                    </span>
                    <span className="text-zinc-500">pax</span>
                </div>

                <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-xs font-bold">
                        {activeCount} aktif
                    </span>
                </div>

                {/* User section */}
                {user ? (
                    <div className="flex items-center gap-2 ml-1 border-l border-zinc-700 pl-3">
                        {user.user_metadata?.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.user_metadata.avatar_url}
                                alt=""
                                className="w-7 h-7 rounded-full border-2 border-green-500/30"
                            />
                        ) : (
                            <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">
                                {(user.user_metadata?.full_name || user.email || '?')[0].toUpperCase()}
                            </div>
                        )}
                        <button
                            onClick={signOut}
                            className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                            title="Log keluar"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={signInWithGoogle}
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-green-400 transition-colors border border-zinc-700 hover:border-green-500/30 rounded-full px-3 py-1.5 text-xs"
                    >
                        <User className="w-3 h-3" />
                        <span>Log Masuk</span>
                    </button>
                )}
            </div>
        </div>
    )
}
