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
        <div className="w-full glass-panel border-b border-green-500/10 flex-shrink-0">
            <div className="flex items-center justify-around py-1.5 px-2">
                <div className="flex items-center gap-1 text-center">
                    <Utensils className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <div>
                        <span className="text-green-400 text-xs font-bold">
                            <AnimatedNumber target={totalMealsSaved} />
                        </span>
                        <span className="text-zinc-600 text-[7px] uppercase tracking-wider ml-1">
                            Hidangan
                        </span>
                    </div>
                </div>

                <div className="w-px h-4 bg-zinc-800" />

                <div className="flex items-center gap-1 text-center">
                    <Building2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <div>
                        <span className="text-green-400 text-xs font-bold">
                            <AnimatedNumber target={activeMosques} />
                        </span>
                        <span className="text-zinc-600 text-[7px] uppercase tracking-wider ml-1">
                            Masjid
                        </span>
                    </div>
                </div>

                <div className="w-px h-4 bg-zinc-800" />

                <div className="flex items-center gap-1 text-center">
                    <Leaf className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <div>
                        <span className="text-emerald-400 text-xs font-bold">
                            ~<AnimatedNumber target={wastePreventedKg} />kg
                        </span>
                        <span className="text-zinc-600 text-[7px] uppercase tracking-wider ml-1">
                            Jimat
                        </span>
                    </div>
                </div>

                <div className="w-px h-4 bg-zinc-800" />

                <div className="flex items-center gap-1 text-center">
                    <TrendingUp className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    <div>
                        <span className="text-amber-400 text-xs font-bold">
                            <AnimatedNumber target={totalActivePax} />
                        </span>
                        <span className="text-zinc-600 text-[7px] uppercase tracking-wider ml-1">
                            Pax
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
