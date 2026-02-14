'use client'

import type { Mosque } from '@/lib/supabase'

type BottomTickerProps = {
    mosques: Mosque[]
}

function timeAgoShort(dateString: string): string {
    const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
    if (diff < 1) return 'baru'
    if (diff < 60) return `${diff}m`
    return `${Math.floor(diff / 60)}j`
}

export default function BottomTicker({ mosques }: BottomTickerProps) {
    const messages = mosques.map((m) => {
        if (m.status === 'ACTIVE') {
            return `>> ${m.name} — ${m.food_desc} (${m.pax} pax) [${timeAgoShort(m.last_updated)}]`
        }
        return `>> ${m.name} — HABIS [${timeAgoShort(m.last_updated)}]`
    })

    const tickerText = messages.join('     ')

    return (
        <div className="marquee-container py-3 px-5 sm:py-4 sm:px-6 border-b border-green-500/10">
            <div className="marquee-content">
                <span className="text-[11px] tracking-wider">
                    {tickerText.split('>>').map((segment, i) => {
                        if (!segment.trim()) return null
                        const isLost = segment.includes('HABIS')
                        return (
                            <span key={i}>
                                <span className={isLost ? 'text-zinc-500' : 'text-green-500'}>
                                    {'>> '}
                                </span>
                                <span className={isLost ? 'text-zinc-600' : 'text-green-500/80'}>
                                    {segment.trim()}
                                </span>
                                {'     '}
                            </span>
                        )
                    })}
                </span>
                <span className="text-[11px] tracking-wider">
                    {tickerText.split('>>').map((segment, i) => {
                        if (!segment.trim()) return null
                        const isLost = segment.includes('HABIS')
                        return (
                            <span key={`dup-${i}`}>
                                <span className={isLost ? 'text-zinc-500' : 'text-green-500'}>
                                    {'>> '}
                                </span>
                                <span className={isLost ? 'text-zinc-600' : 'text-green-500/80'}>
                                    {segment.trim()}
                                </span>
                                {'     '}
                            </span>
                        )
                    })}
                </span>
            </div>
        </div>
    )
}
