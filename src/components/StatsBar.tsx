'use client'

import { Utensils, Building2, Leaf, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

type StatsBarProps = {
    totalMealsSaved: number
    activeMosques: number
    totalActivePax: number
}

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        const start = 0
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - (1 - progress) * (1 - progress)
            setDisplay(Math.floor(start + (target - start) * eased))
            if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }, [target, duration])

    return <span>{display.toLocaleString()}</span>
}

export default function StatsBar({ totalMealsSaved, activeMosques, totalActivePax }: StatsBarProps) {
    const wastePreventedKg = Math.round(totalMealsSaved * 0.15)

    return (
        <div className="w-full glass-panel border-y border-green-500/10 flex-shrink-0">
            <div className="flex items-center justify-around py-3 px-4">
                {/* Meals Saved */}
                <div className="flex flex-col items-center gap-0.5">
                    <span className="text-green-400 text-2xl font-bold leading-none tracking-tight">
                        <AnimatedNumber target={totalMealsSaved} />
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <Utensils className="w-3 h-3 text-green-500" />
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">
                            Hidangan
                        </span>
                    </div>
                </div>

                <div className="w-px h-8 bg-zinc-800/50" />

                {/* Active Mosques */}
                <div className="flex flex-col items-center gap-0.5">
                    <span className="text-green-400 text-2xl font-bold leading-none tracking-tight">
                        <AnimatedNumber target={activeMosques} />
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <Building2 className="w-3 h-3 text-green-500" />
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">
                            Masjid
                        </span>
                    </div>
                </div>

                <div className="w-px h-8 bg-zinc-800/50" />

                {/* Waste Prevented */}
                <div className="flex flex-col items-center gap-0.5">
                    <span className="text-emerald-400 text-2xl font-bold leading-none tracking-tight">
                        ~<AnimatedNumber target={wastePreventedKg} />kg
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <Leaf className="w-3 h-3 text-emerald-500" />
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">
                            Jimat
                        </span>
                    </div>
                </div>

                <div className="w-px h-8 bg-zinc-800/50" />

                {/* Available Pax */}
                <div className="flex flex-col items-center gap-0.5">
                    <span className="text-amber-400 text-2xl font-bold leading-none tracking-tight">
                        <AnimatedNumber target={totalActivePax} />
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <TrendingUp className="w-3 h-3 text-amber-500" />
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-bold">
                            Pax
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
