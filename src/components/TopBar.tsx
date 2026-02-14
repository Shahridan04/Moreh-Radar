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
        <div className="w-full glass-panel flex-shrink-0 z-[800]">
            {/* Row 1: Title + User */}
            <div className="px-5 py-5 sm:px-6 sm:py-6 flex items-center justify-between border-b border-zinc-800/30 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <Radar className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 text-sm uppercase tracking-wider font-bold">
                        Moreh Radar
                    </span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>

                {/* Right: Quick stats + User */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-400 font-bold">
                            {mealsDetected.toLocaleString()}
                        </span>
                        <span className="text-zinc-600">pax</span>
                    </div>

                    <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-500 text-[11px] font-bold">
                            {activeCount} aktif
                        </span>
                    </div>

                    {/* User section */}
                    {user ? (
                        <div className="flex items-center gap-3 ml-1 border-l border-zinc-700 pl-4">
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
                            className="flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors border border-zinc-700 hover:border-green-500/30 rounded-full px-4 py-2 text-xs"
                        >
                            <User className="w-4 h-4" />
                            <span>Log Masuk</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
