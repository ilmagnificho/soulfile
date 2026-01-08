"use client";

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Flame, Droplet, TreePine, Hammer, Mountain, Loader2, Shield, Calendar, Heart, TrendingUp, AlertTriangle } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { calculateElement } from "@/lib/elements";
import { getFortune, getRedactedPreview } from "@/lib/fortunes";
import SoulCard from "@/components/saja-ui/SoulCard";
import Footer from "@/components/saja-ui/Footer";
import { trackUnlockClick } from "@/lib/analytics";

// Map elements to icons
const elementIcons = {
    fire: Flame,
    water: Droplet,
    wood: TreePine,
    metal: Hammer,
    earth: Mountain,
};

// Generate random stats for radar chart
const generateStats = (element: string) => {
    return [
        { stat: "Karma", value: Math.floor(Math.random() * 30) + 70 },
        { stat: "Wealth", value: Math.floor(Math.random() * 30) + 60 },
        { stat: "Health", value: Math.floor(Math.random() * 30) + 65 },
        { stat: "Love", value: Math.floor(Math.random() * 30) + 55 },
        { stat: "Power", value: Math.floor(Math.random() * 30) + 70 },
    ];
};

function ReportContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Unknown";
    const birthDate = searchParams.get("birthDate") || "";
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const elementData = calculateElement(birthDate);
    const ElementIcon = elementIcons[elementData.element];
    const stats = generateStats(elementData.element);
    const fortune = getFortune(elementData.element);
    const preview = getRedactedPreview(fortune);

    // MVP Simulated Payment
    const handleUnlock = async () => {
        trackUnlockClick(elementData.element, birthDate);
        setIsProcessingPayment(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsUnlocked(true);
        setIsProcessingPayment(false);

        // Scroll to revealed content
        setTimeout(() => {
            contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    return (
        <div className="relative">
            {/* MAIN CONTENT */}
            <main className="min-h-screen bg-black text-white p-4 md:p-8 pb-32">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 sm:mb-8"
                    >
                        <Link
                            href="/"
                            className="inline-block font-mono text-xs sm:text-sm bg-black/90 border border-zinc-700 px-3 py-2 hover:bg-zinc-900 hover:text-green-400 transition-all mb-4"
                        >
                            &lt; TERMINAL_ACCESS
                        </Link>

                        <div className="border-l-4 border-red-600 pl-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                SOUL FILE RETRIEVED
                            </h1>
                            <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider">
                                Subject: {name} • Element: {elementData.element.toUpperCase()}
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Element Hero */}
                            <div className="border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
                                <div className="flex items-center gap-6">
                                    <div
                                        className={`w-24 h-24 rounded-full border-2 flex items-center justify-center ${elementData.element === "fire" ? "border-red-600 bg-red-600/10" :
                                                elementData.element === "water" ? "border-blue-600 bg-blue-600/10" :
                                                    elementData.element === "wood" ? "border-green-600 bg-green-600/10" :
                                                        elementData.element === "metal" ? "border-zinc-400 bg-zinc-400/10" :
                                                            "border-amber-600 bg-amber-600/10"
                                            }`}
                                    >
                                        <ElementIcon className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Primary Element</p>
                                        <h2 className={`text-3xl font-bold ${elementData.color} mb-1`}>
                                            {elementData.element.toUpperCase()}
                                        </h2>
                                        <p className="text-zinc-400 text-sm">{elementData.description}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {elementData.traits.map((trait, i) => (
                                        <span key={i} className="px-3 py-1 bg-zinc-800 text-xs uppercase tracking-wider text-zinc-400">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Birth Info */}
                            <div className="border border-zinc-800 bg-zinc-900/50 p-4">
                                <p className="text-zinc-500 text-xs uppercase mb-1">Birth Date</p>
                                <p className="font-mono text-white">{birthDate}</p>
                            </div>
                        </motion.div>

                        {/* Right Column: Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 h-full">
                                <h3 className="text-red-500 uppercase tracking-wider text-sm font-bold mb-4 text-center">
                                    Soul Analysis Matrix
                                </h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={stats}>
                                            <PolarGrid stroke="#3f3f46" />
                                            <PolarAngleAxis dataKey="stat" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#71717a', fontSize: 10 }} />
                                            <Radar name="Stats" dataKey="value" stroke="#dc2626" fill="#dc2626" fillOpacity={0.4} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Soul Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
                            <h3 className="text-zinc-400 text-sm font-bold uppercase mb-2 text-center tracking-wider">
                                Your Soul Card
                            </h3>
                            <p className="text-zinc-600 text-xs text-center mb-6">
                                Premium access credential for 2026
                            </p>
                            <SoulCard name={name} birthDate={birthDate} element={elementData.element} />
                        </div>
                    </motion.div>

                    {/* 2026 Predictions Section */}
                    <motion.div
                        ref={contentRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                                2026 Destiny Analysis
                            </h3>
                        </div>

                        {!isUnlocked ? (
                            /* LOCKED STATE - Teaser */
                            <div className="space-y-6">
                                {/* Danger Preview (Redacted) */}
                                <div className="bg-red-950/20 border border-red-900/50 p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Lock className="w-4 h-4 text-red-500" />
                                        <p className="text-red-500 text-sm font-bold uppercase">Critical Warning Detected</p>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {preview.danger}
                                    </p>
                                </div>

                                {/* Locked Sections Preview */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { icon: TrendingUp, label: "Wealth", color: "text-yellow-500" },
                                        { icon: Heart, label: "Love", color: "text-pink-500" },
                                        { icon: Shield, label: "Health", color: "text-green-500" },
                                        { icon: Calendar, label: "Lucky Dates", color: "text-blue-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 text-center">
                                            <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color} opacity-50`} />
                                            <p className="text-zinc-500 text-xs uppercase">{item.label}</p>
                                            <p className="text-zinc-700 text-lg mt-1">████</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-zinc-600 text-xs text-center">
                                    Decrypt to reveal complete 2026 wealth, love, health analysis and lucky dates
                                </p>
                            </div>
                        ) : (
                            /* UNLOCKED STATE - Full Content */
                            <div className="space-y-6">
                                {/* Danger */}
                                <div className="bg-red-950/20 border border-red-900/50 p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                        <p className="text-red-500 text-sm font-bold uppercase">Critical Warning</p>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {fortune.danger}
                                    </p>
                                </div>

                                {/* Wealth */}
                                <div className="bg-yellow-950/10 border border-yellow-900/30 p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp className="w-4 h-4 text-yellow-500" />
                                        <p className="text-yellow-500 text-sm font-bold uppercase">Wealth & Finance</p>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {fortune.wealth}
                                    </p>
                                </div>

                                {/* Love */}
                                <div className="bg-pink-950/10 border border-pink-900/30 p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Heart className="w-4 h-4 text-pink-500" />
                                        <p className="text-pink-500 text-sm font-bold uppercase">Love & Relationships</p>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {fortune.love}
                                    </p>
                                </div>

                                {/* Health */}
                                <div className="bg-green-950/10 border border-green-900/30 p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        <p className="text-green-500 text-sm font-bold uppercase">Health & Vitality</p>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {fortune.health}
                                    </p>
                                </div>

                                {/* Career */}
                                <div className="bg-blue-950/10 border border-blue-900/30 p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp className="w-4 h-4 text-blue-500" />
                                        <p className="text-blue-500 text-sm font-bold uppercase">Career & Purpose</p>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {fortune.career}
                                    </p>
                                </div>

                                {/* Dates Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-emerald-950/10 border border-emerald-900/30 p-4">
                                        <p className="text-emerald-500 text-xs font-bold uppercase mb-2">Lucky Dates</p>
                                        <div className="flex flex-wrap gap-2">
                                            {fortune.lucky_dates.map((date, i) => (
                                                <span key={i} className="px-2 py-1 bg-emerald-900/30 text-emerald-400 text-xs">
                                                    {date}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-red-950/10 border border-red-900/30 p-4">
                                        <p className="text-red-500 text-xs font-bold uppercase mb-2">Avoid These Dates</p>
                                        <div className="flex flex-wrap gap-2">
                                            {fortune.unlucky_dates.map((date, i) => (
                                                <span key={i} className="px-2 py-1 bg-red-900/30 text-red-400 text-xs">
                                                    {date}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Talisman */}
                                <div className="bg-purple-950/10 border border-purple-900/30 p-4 sm:p-6">
                                    <p className="text-purple-500 text-xs font-bold uppercase mb-2">Protective Talisman</p>
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {fortune.talisman}
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        {fortune.lucky_colors.map((color, i) => (
                                            <span key={i} className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs">
                                                {color}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <Footer />
                </div>
            </main>

            {/* 🔥 GLASSMORPHISM FLOATING DECRYPT BAR 🔥 */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 999999,
                    width: 'calc(100% - 32px)',
                    maxWidth: '500px',
                }}
            >
                <motion.button
                    onClick={handleUnlock}
                    disabled={isProcessingPayment || isUnlocked}
                    whileHover={!isProcessingPayment && !isUnlocked ? { scale: 1.02 } : {}}
                    whileTap={!isProcessingPayment && !isUnlocked ? { scale: 0.98 } : {}}
                    animate={!isProcessingPayment && !isUnlocked ? {
                        boxShadow: [
                            "0 0 20px rgba(220, 38, 38, 0.3), 0 0 40px rgba(234, 179, 8, 0.1)",
                            "0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(234, 179, 8, 0.2)",
                            "0 0 20px rgba(220, 38, 38, 0.3), 0 0 40px rgba(234, 179, 8, 0.1)",
                        ],
                    } : {}}
                    transition={{
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{
                        width: '100%',
                        padding: '16px 24px',
                        background: isUnlocked
                            ? 'rgba(34, 197, 94, 0.1)'
                            : 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(16px)',
                        border: isUnlocked
                            ? '1px solid rgba(34, 197, 94, 0.3)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: isProcessingPayment || isUnlocked ? 'default' : 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {isUnlocked ? (
                        <span className="text-green-400 font-semibold text-sm tracking-wide">
                            ✓ DECRYPTED — SCROLL UP TO VIEW
                        </span>
                    ) : isProcessingPayment ? (
                        <>
                            <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                            <span className="text-zinc-400 font-medium text-sm">DECRYPTING...</span>
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 text-red-400" />
                            <span className="text-white font-semibold text-sm tracking-wide">
                                DECRYPT SOULFILE 2026
                            </span>
                            <span className="text-zinc-500 text-xs ml-2">$4.99</span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-red-600">Loading...</div>}>
            <ReportContent />
        </Suspense>
    );
}
