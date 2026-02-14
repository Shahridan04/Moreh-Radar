'use client'

import { Radar, LogOut, User } from 'lucide-react'
import { useAuth } from '@/lib/auth'

type TopBarProps = {
    mealsDetected: number
    activeCount: number
}

export default function TopBar({ mealsDetected, activeCount }: TopBarProps) {
    const { user, signInWithGoogle, signOut } = useAuth()

    return (
        <div className="w-full glass-panel px-4 py-2.5 flex items-center justify-between flex-shrink-0 z-[800]">
            {/* Left: System Title */}
            <div className="flex items-center gap-2">
                <Radar className="w-5 h-5 text-green-500" />
                <span className="text-green-500 text-sm uppercase tracking-wider font-bold">
                    Moreh Radar
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            {/* Right: Stats + User */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-green-400 font-bold">
                        {mealsDetected.toLocaleString()}
                    </span>
                    <span className="text-zinc-600">pax</span>
                </div>

                <div className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-[10px] font-bold">
                        {activeCount} aktif
                    </span>
                </div>

                {/* User section */}
                {user ? (
                    <div className="flex items-center gap-1.5 ml-1 border-l border-zinc-700 pl-2">
                        {user.user_metadata?.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={user.user_metadata.avatar_url}
                                alt=""
                                className="w-6 h-6 rounded-full border border-green-500/30"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-[10px] font-bold">
                                {(user.user_metadata?.full_name || user.email || '?')[0].toUpperCase()}
                            </div>
                        )}
                        <button
                            onClick={signOut}
                            className="text-zinc-600 hover:text-red-400 transition-colors p-0.5"
                            title="Log keluar"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={signInWithGoogle}
                        className="flex items-center gap-1 text-zinc-400 hover:text-green-400 transition-colors border border-zinc-700 hover:border-green-500/30 rounded-full px-2 py-1 text-[10px]"
                    >
                        <User className="w-3 h-3" />
                        <span>Log Masuk</span>
                    </button>
                )}
            </div>
        </div>
    )
}
