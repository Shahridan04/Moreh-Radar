'use client'

import { motion } from 'framer-motion'
import {
    Radar,
    MapPin,
    Users,
    Leaf,
    ArrowRight,
    Zap,
    Share2,
    Bell,
} from 'lucide-react'

type LandingPageProps = {
    onEnter: () => void
}

export default function LandingPage({ onEnter }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white overflow-y-auto flex flex-col items-center w-full">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-20 overflow-hidden">
                {/* Animated background grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0,255,65,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Radar sweep background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.05, scale: 1 }}
                        transition={{ duration: 2 }}
                        className="w-[600px] h-[600px] rounded-full border border-green-500/20"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.03, scale: 1 }}
                        transition={{ duration: 2, delay: 0.3 }}
                        className="absolute w-[400px] h-[400px] rounded-full border border-green-500/20"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.02, scale: 1 }}
                        transition={{ duration: 2, delay: 0.6 }}
                        className="absolute w-[200px] h-[200px] rounded-full border border-green-500/20"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-10 max-w-lg mx-auto px-2">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        className="mx-auto w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center"
                    >
                        <Radar className="w-10 h-10 text-green-500" />
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                            <span className="text-green-500">Moreh</span>{' '}
                            <span className="text-white">Radar</span>
                        </h1>
                        <p className="text-zinc-500 text-sm uppercase tracking-[0.3em]">
                            Kill Hunger. Kill Waste.
                        </p>
                    </motion.div>

                    {/* Problem Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-5 px-2"
                    >
                        <p className="text-zinc-300 text-lg leading-relaxed">
                            Setiap Ramadan, Malaysia membazirkan{' '}
                            <span className="text-amber-400 font-bold">3,000 tan</span>{' '}
                            makanan. Pada masa yang sama, pelajar universiti kelaparan{' '}
                            <span className="text-green-400 font-bold">2km</span> dari masjid
                            yang mempunyai lebihan moreh.
                        </p>
                        <p className="text-zinc-400 text-base">
                            Moreh Radar menghubungkan masjid berlebihan makanan dengan komuniti
                            yang memerlukan — dalam <span className="text-green-400 font-bold">masa nyata</span>.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="grid grid-cols-3 gap-4"
                    >
                        <div className="glass-panel rounded-xl p-4 py-5 text-center">
                            <div className="text-green-400 text-2xl font-bold">3,000</div>
                            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-2">
                                Tan Bazir/Ramadan
                            </div>
                        </div>
                        <div className="glass-panel rounded-xl p-4 py-5 text-center">
                            <div className="text-amber-400 text-2xl font-bold">65%</div>
                            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-2">
                                Masih Boleh Dimakan
                            </div>
                        </div>
                        <div className="glass-panel rounded-xl p-4 py-5 text-center">
                            <div className="text-emerald-400 text-2xl font-bold">0</div>
                            <div className="text-zinc-500 text-[10px] uppercase tracking-wider mt-2">
                                Platform Sedia Ada
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <button
                            onClick={onEnter}
                            className="w-full py-5 my-8 bg-green-500 hover:bg-green-400 text-black rounded-2xl text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                            style={{ minHeight: '60px' }}
                        >
                            Buka Radar
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>

                    {/* SDG badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex items-center justify-center gap-3 pt-2"
                    >
                        <div className="flex items-center gap-1.5 text-zinc-600 text-[10px] uppercase tracking-wider">
                            <div className="w-5 h-5 rounded bg-[#DDA63A] flex items-center justify-center text-white text-[8px] font-bold">
                                2
                            </div>
                            Zero Hunger
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <div className="flex items-center gap-1.5 text-zinc-600 text-[10px] uppercase tracking-wider">
                            <div className="w-5 h-5 rounded bg-[#BF8B2E] flex items-center justify-center text-white text-[8px] font-bold">
                                12
                            </div>
                            Responsible Consumption
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-8 py-16 max-w-4xl mx-auto space-y-12">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-zinc-500 text-xs uppercase tracking-[0.3em] mb-8"
                >
                    Cara Penggunaan
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: <MapPin className="w-6 h-6" />,
                            title: 'Peta Masa Nyata',
                            desc: 'Lihat semua masjid yang menyiarkan makanan berlebihan di sekeliling anda.',
                            color: 'green',
                        },
                        {
                            icon: <Zap className="w-6 h-6" />,
                            title: '"Saya Nak Pergi!"',
                            desc: 'Daftar kedatangan supaya masjid tahu berapa orang sedang menuju.',
                            color: 'amber',
                        },
                        {
                            icon: <Share2 className="w-6 h-6" />,
                            title: 'Kongsi via WhatsApp',
                            desc: 'Sebarkan maklumat makanan kepada rakan dengan satu klik.',
                            color: 'emerald',
                        },
                        {
                            icon: <Bell className="w-6 h-6" />,
                            title: 'Notifikasi Rezeki',
                            desc: 'Terima pemberitahuan apabila makanan ada berhampiran anda.',
                            color: 'blue',
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center glass-panel rounded-2xl p-8 gap-5 hover:bg-zinc-900/40 transition-colors group border-zinc-800/50 hover:border-green-500/20"
                        >
                            <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300 ${feature.color === 'green'
                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                    : feature.color === 'amber'
                                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                        : feature.color === 'emerald'
                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                            : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                    }`}
                            >
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-bold mb-3 tracking-wide">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* For Who Section */}
            <section className="px-8 py-16 max-w-lg mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-zinc-500 text-xs uppercase tracking-[0.3em] mb-8"
                >
                    Untuk Siapa?
                </motion.h2>

                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-xl p-5 text-center space-y-3"
                    >
                        <div className="text-3xl">🕌</div>
                        <h3 className="text-green-400 text-sm font-bold">AJK Masjid</h3>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">
                            Siarkan makanan berlebihan dengan mudah
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel rounded-xl p-5 text-center space-y-3"
                    >
                        <div className="text-3xl">🎓</div>
                        <h3 className="text-green-400 text-sm font-bold">Pelajar</h3>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">
                            Cari makanan moreh berdekatan dalam satu klik
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel rounded-xl p-5 text-center space-y-3"
                    >
                        <div className="text-3xl">👨‍👩‍👧‍👦</div>
                        <h3 className="text-green-400 text-sm font-bold">Komuniti</h3>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">
                            Bantu agihkan rezeki kepada yang memerlukan
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel rounded-xl p-5 text-center space-y-3"
                    >
                        <div className="text-3xl">🌍</div>
                        <h3 className="text-green-400 text-sm font-bold">Bumi</h3>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">
                            Kurangkan pembaziran, jimat karbon
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="px-8 py-16 pb-20 max-w-lg mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-6"
                >
                    <p className="text-zinc-400 text-sm">
                        Setiap hidangan yang diselamatkan adalah satu nyawa yang dijaga.
                    </p>
                    <button
                        onClick={onEnter}
                        className="w-full py-5 bg-green-500 hover:bg-green-400 text-black rounded-2xl text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                    >
                        <Radar className="w-5 h-5" />
                        Buka Radar Sekarang
                    </button>
                    <p className="text-zinc-700 text-[10px] uppercase tracking-widest">
                        Moreh Radar v1.0 · SDG 2 & 12 · Made in 🇲🇾
                    </p>
                </motion.div>
            </section>
        </div>
    )
}
