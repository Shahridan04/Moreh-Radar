'use client'

import { motion } from 'framer-motion'
import {
    Radar,
    MapPin,
    ArrowRight,
    Zap,
    Share2,
    Bell,
} from 'lucide-react'

type LandingPageProps = {
    onEnter: () => void
}

const FEATURES = [
    {
        icon: MapPin,
        title: 'Peta Masa Nyata',
        desc: 'Lihat semua masjid yang menyiarkan makanan berlebihan di sekeliling anda.',
        color: 'green',
    },
    {
        icon: Zap,
        title: '"Saya Nak Pergi!"',
        desc: 'Daftar kedatangan supaya masjid tahu berapa orang sedang menuju.',
        color: 'amber',
    },
    {
        icon: Share2,
        title: 'Kongsi via WhatsApp',
        desc: 'Sebarkan maklumat makanan kepada rakan dengan satu klik.',
        color: 'emerald',
    },
    {
        icon: Bell,
        title: 'Notifikasi Rezeki',
        desc: 'Terima pemberitahuan apabila makanan ada berhampiran anda.',
        color: 'blue',
    },
] as const

const AUDIENCES = [
    { emoji: '🕌', title: 'AJK Masjid', desc: 'Siarkan makanan berlebihan dengan mudah' },
    { emoji: '🎓', title: 'Pelajar', desc: 'Cari makanan moreh berdekatan dalam satu klik' },
    { emoji: '👨‍👩‍👧‍👦', title: 'Komuniti', desc: 'Bantu agihkan rezeki kepada yang memerlukan' },
    { emoji: '🌍', title: 'Bumi', desc: 'Kurangkan pembaziran, jimat karbon' },
] as const

const STATS = [
    { value: '3,000', label: 'Tan Bazir/Ramadan', color: 'text-green-400' },
    { value: '65%', label: 'Masih Boleh Dimakan', color: 'text-amber-400' },
    { value: '0', label: 'Platform Sedia Ada', color: 'text-emerald-400' },
] as const

const iconColorClasses = {
    green: 'bg-green-500/10 text-green-500 border-green-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
} as const

export default function LandingPage({ onEnter }: LandingPageProps) {
    return (
        <div
            className="relative min-h-[100dvh] min-h-[100vh] w-full overflow-x-hidden overflow-y-auto bg-zinc-950 text-white"
            style={{
                paddingTop: 'env(safe-area-inset-top, 0)',
                paddingBottom: 'env(safe-area-inset-bottom, 0)',
            }}
        >
            {/* Full-page grid background — spans entire landing page */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
                aria-hidden
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,255,65,1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)
                    `,
                    backgroundSize: 'clamp(24px, 5vw, 40px) clamp(24px, 5vw, 40px)',
                }}
            />

            {/* ───────────────────────────────────────────────────────────────
                HERO SECTION
                Mobile-first: stacking layout, responsive radar rings
            ─────────────────────────────────────────────────────────────── */}
            <section
                className="relative flex min-h-[100dvh] min-h-[100vh] w-full flex-col items-center justify-center px-6 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
                aria-label="Hero"
            >
                {/* Radar rings — scale with viewport */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {[
                        { size: 'clamp(180px, 50vw, 600px)', delay: 0, opacity: 0.05 },
                        { size: 'clamp(120px, 35vw, 400px)', delay: 0.3, opacity: 0.03 },
                        { size: 'clamp(60px, 18vw, 200px)', delay: 0.6, opacity: 0.02 },
                    ].map((ring, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: ring.opacity, scale: 1 }}
                            transition={{ duration: 2, delay: ring.delay }}
                            className="absolute rounded-full border border-green-500/20"
                            style={{
                                width: ring.size,
                                height: ring.size,
                            }}
                        />
                    ))}
                </div>

                {/* Hero content — vertically centered for balanced layout */}
                <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-7 text-center sm:gap-9">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 p-3 sm:h-20 sm:w-20 sm:rounded-2xl sm:p-3.5"
                    >
                        <Radar className="h-6 w-6 text-green-500 sm:h-8 sm:w-8" />
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-1 sm:space-y-2"
                    >
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            <span className="text-green-500">Moreh</span>{' '}
                            <span className="text-white">Radar</span>
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 sm:text-base sm:tracking-[0.3em]">
                            Kill Hunger. Kill Waste.
                        </p>
                    </motion.div>

                    {/* Problem statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3 sm:space-y-4"
                    >
                        <p className="text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
                            Setiap Ramadan, Malaysia membazirkan{' '}
                            <span className="font-bold text-amber-400">3,000 tan</span>{' '}
                            makanan. Pada masa yang sama, pelajar universiti kelaparan{' '}
                            <span className="font-bold text-green-400">2km</span> dari masjid
                            yang mempunyai lebihan moreh.
                        </p>
                        <p className="text-sm text-zinc-400 sm:text-base">
                            Moreh Radar menghubungkan masjid berlebihan makanan dengan komuniti
                            yang memerlukan — dalam <span className="font-bold text-green-400">masa nyata</span>.
                        </p>
                    </motion.div>

                    {/* Stats — responsive grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid w-full grid-cols-3 gap-2 sm:gap-4"
                    >
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="glass-panel flex flex-col items-center justify-center rounded-lg px-4 py-4 text-center sm:rounded-xl sm:px-5 sm:py-6"
                            >
                                <span className={`text-lg font-bold sm:text-2xl ${stat.color}`}>
                                    {stat.value}
                                </span>
                                <span className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500 sm:mt-2 sm:text-xs">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA — min 44px touch target */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="w-full max-w-sm"
                    >
                        <button
                            onClick={onEnter}
                            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-4 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all hover:bg-green-400 active:scale-[0.98] sm:min-h-[56px] sm:rounded-2xl sm:py-5 sm:text-lg sm:tracking-wider"
                        >
                            Buka Radar
                            <ArrowRight className="h-5 w-5 shrink-0" />
                        </button>
                    </motion.div>

                    {/* SDG badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                    >
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-600 sm:text-xs">
                            <span className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-md px-2.5 py-1.5 bg-[#DDA63A] text-xs font-bold text-white">
                                2
                            </span>
                            Zero Hunger
                        </div>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-700" aria-hidden />
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-600 sm:text-xs">
                            <span className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-md px-2.5 py-1.5 bg-[#BF8B2E] text-xs font-bold text-white">
                                12
                            </span>
                            <span className="whitespace-nowrap">Responsible Consumption</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ───────────────────────────────────────────────────────────────
                FEATURES — Cara Penggunaan
            ─────────────────────────────────────────────────────────────── */}
            <section
                className="relative flex w-full justify-center px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 md:px-8 md:pt-24 md:pb-20"
                aria-labelledby="features-heading"
            >
                <div className="w-full max-w-4xl">
                    <motion.h2
                        id="features-heading"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        className="mb-10 text-center text-lg font-semibold uppercase tracking-[0.15em] text-zinc-400 sm:mb-12 sm:text-xl sm:tracking-[0.2em] md:text-2xl md:tracking-[0.25em]"
                    >
                        Cara Penggunaan
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
                        {FEATURES.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-30px' }}
                                transition={{ delay: i * 0.08 }}
                                className="group glass-panel flex flex-col items-center rounded-xl px-8 pt-10 pb-8 text-center transition-colors hover:border-green-500/30 sm:rounded-2xl sm:px-10 sm:pt-12 sm:pb-10"
                            >
                                <div
                                    className={`flex min-h-[5.5rem] min-w-[5.5rem] shrink-0 items-center justify-center rounded-xl border p-6 transition-transform duration-300 group-hover:scale-110 sm:min-h-[6rem] sm:min-w-[6rem] sm:p-7 ${iconColorClasses[feature.color]}`}
                                >
                                    <feature.icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                                </div>
                                <h3 className="mt-5 text-base font-bold tracking-wide text-white sm:text-lg md:text-xl">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-zinc-400 sm:text-base">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────────────────────────────────────────────────────────
                AUDIENCE — Untuk Siapa?
            ─────────────────────────────────────────────────────────────── */}
            <section
                className="relative flex w-full justify-center px-4 pt-12 pb-12 sm:px-6 sm:pt-16 sm:pb-16 md:px-8 md:pt-20 md:pb-20"
                aria-labelledby="audience-heading"
            >
                <div className="w-full max-w-4xl">
                    <motion.h2
                        id="audience-heading"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        className="mb-10 text-center text-lg font-semibold uppercase tracking-[0.15em] text-zinc-400 sm:mb-12 sm:text-xl sm:tracking-[0.2em] md:text-2xl md:tracking-[0.25em]"
                    >
                        Untuk Siapa?
                    </motion.h2>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
                        {AUDIENCES.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-20px' }}
                                transition={{ delay: i * 0.06 }}
                                className="glass-panel flex flex-col items-center rounded-xl px-8 pt-10 pb-8 text-center transition-colors hover:border-green-500/30 sm:rounded-2xl sm:px-10 sm:pt-12 sm:pb-10"
                            >
                                <div
                                    className="flex min-h-[5.5rem] min-w-[5.5rem] shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/5 p-6 sm:min-h-[6rem] sm:min-w-[6rem] sm:p-7"
                                    aria-hidden
                                >
                                    <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                                </div>
                                <h3 className="mt-5 text-base font-bold text-green-400 sm:text-lg md:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-zinc-500 sm:text-base">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────────────────────────────────────────────────────────────
                BOTTOM CTA
            ─────────────────────────────────────────────────────────────── */}
            <section
                className="relative flex w-full justify-center px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28 md:px-8 md:pt-20 md:pb-32"
                aria-label="Call to action"
            >
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex w-full max-w-md flex-col items-center gap-5 text-center"
                >
                    <p className="text-base text-zinc-400 sm:text-lg">
                        Setiap hidangan yang diselamatkan adalah satu nyawa yang dijaga.
                    </p>
                    <button
                        onClick={onEnter}
                        className="flex min-h-[48px] w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-green-500 py-4 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all hover:bg-green-400 active:scale-[0.98] sm:min-h-[56px] sm:rounded-2xl sm:py-5 sm:text-lg"
                    >
                        <Radar className="h-5 w-5 shrink-0" />
                        Buka Radar Sekarang
                    </button>
                    <p className="pt-4 pb-8 text-xs uppercase tracking-widest text-zinc-600 sm:pb-10">
                        Moreh Radar v1.0 · SDG 2 & 12 · Made in 🇲🇾
                    </p>
                </motion.div>
            </section>
        </div>
    )
}
