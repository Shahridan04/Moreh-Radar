'use client'

import { motion } from 'framer-motion'
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
    const wastePreventedKg = Math.round(totalMealsSaved * 0.15) // ~150g per meal

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed top-[52px] left-0 right-0 z-[750] glass-panel border-b border-green-500/10"
        >
            <div className="flex items-center justify-around py-2.5 px-2">
                {/* Meals Saved */}
                <div className="flex items-center gap-1.5 text-center">
                    <Utensils className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <div>
                        <div className="text-green-400 text-sm font-bold leading-tight">
                            <AnimatedNumber target={totalMealsSaved} />
                        </div>
                        <div className="text-zinc-600 text-[8px] uppercase tracking-wider leading-tight">
                            Hidangan
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-zinc-800" />

                {/* Active Mosques */}
                <div className="flex items-center gap-1.5 text-center">
                    <Building2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <div>
                        <div className="text-green-400 text-sm font-bold leading-tight">
                            <AnimatedNumber target={activeMosques} />
                        </div>
                        <div className="text-zinc-600 text-[8px] uppercase tracking-wider leading-tight">
                            Masjid Aktif
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-zinc-800" />

                {/* Waste Prevented */}
                <div className="flex items-center gap-1.5 text-center">
                    <Leaf className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <div>
                        <div className="text-emerald-400 text-sm font-bold leading-tight">
                            ~<AnimatedNumber target={wastePreventedKg} />kg
                        </div>
                        <div className="text-zinc-600 text-[8px] uppercase tracking-wider leading-tight">
                            Jimat Bazir
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-zinc-800" />

                {/* Available Now */}
                <div className="flex items-center gap-1.5 text-center">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <div>
                        <div className="text-amber-400 text-sm font-bold leading-tight">
                            <AnimatedNumber target={totalActivePax} />
                        </div>
                        <div className="text-zinc-600 text-[8px] uppercase tracking-wider leading-tight">
                            Pax Tersedia
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
