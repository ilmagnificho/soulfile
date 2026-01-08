"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Flame, Droplet, TreePine, Hammer, Mountain, Loader2 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { calculateElement } from "@/lib/elements";
import Talisman from "@/components/saja-ui/Talisman";
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

    const elementData = calculateElement(birthDate);
    const ElementIcon = elementIcons[elementData.element];
    const stats = generateStats(elementData.element);

    // MVP Simulated Payment - Dark Pattern Test
    const handleUnlock = async () => {
        trackUnlockClick(elementData.element, birthDate);
        setIsProcessingPayment(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsUnlocked(true);
        setIsProcessingPayment(false);
    };

    return (
        <>
            {/* MAIN CONTENT - Contains all page content with overflow-hidden */}
            <main className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden pb-32">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[150px]" />

                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 sm:mb-8"
                    >
                        <Link
                            href="/"
                            className="fixed top-4 left-4 z-50 font-mono text-xs sm:text-sm bg-black/90 border border-zinc-700 px-3 py-2 hover:bg-zinc-900 hover:text-green-400 transition-all flex items-center gap-2 shadow-md"
                        >
                            <span>&lt;</span>
                            <span>TERMINAL_ACCESS</span>
                        </Link>

                        <div className="border-l-4 border-red-600 pl-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                                SOUL FILE RETRIEVED
                            </h1>
                            <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider">
                                Subject: {name}
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                        {/* Left Column: Soul Identity Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Element Hero */}
                            <div className="border-2 border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-black p-6 sm:p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-purple-600/10" />
                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1, opacity: [1, 0.9, 1] }}
                                            transition={{ scale: { delay: 0.4, type: "spring" }, opacity: { duration: 2, repeat: Infinity } }}
                                            className={`w-40 h-40 md:w-56 md:h-56 rounded-full border-4 ${elementData.element === "fire" ? "border-red-600 bg-red-600/20" : elementData.element === "water" ? "border-blue-600 bg-blue-600/20" : elementData.element === "wood" ? "border-green-600 bg-green-600/20" : elementData.element === "metal" ? "border-zinc-400 bg-zinc-400/20" : "border-amber-600 bg-amber-600/20"} flex items-center justify-center`}
                                            style={{ boxShadow: `0 0 30px rgba(220, 38, 38, 0.6)` }}
                                        >
                                            <ElementIcon className="w-24 h-24 md:w-32 md:h-32" />
                                        </motion.div>
                                        <div className="text-center sm:text-left">
                                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Primary Element</p>
                                            <h2 className={`text-4xl sm:text-5xl font-bold ${elementData.color} mb-2`}>{elementData.element.toUpperCase()}</h2>
                                            <p className="text-zinc-400 text-sm sm:text-base">{elementData.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
                                        {elementData.traits.map((trait, i) => (
                                            <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs uppercase tracking-wider text-zinc-400">{trait}</motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="border border-zinc-800 bg-black/50 p-4 sm:p-6 space-y-3">
                                <div className="text-sm">
                                    <p className="text-zinc-500 text-xs uppercase mb-1">Birth Date</p>
                                    <p className="font-mono text-white">{birthDate}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Stats */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
                            <div className="border-2 border-zinc-800 bg-black/50 p-4 sm:p-6">
                                <h3 className="text-red-500 uppercase tracking-wider text-sm sm:text-lg font-bold mb-4 text-center">Soul Analysis Matrix</h3>
                                <div className="h-64 sm:h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={stats}>
                                            <PolarGrid stroke="#3f3f46" />
                                            <PolarAngleAxis dataKey="stat" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#71717a', fontSize: 10 }} />
                                            <Radar name="Stats" dataKey="value" stroke="#dc2626" fill="#dc2626" fillOpacity={0.5} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Soul Card Section */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <div className="border-2 border-purple-600/30 bg-gradient-to-br from-purple-950/20 to-pink-950/20 p-6 sm:p-8">
                            <h3 className="text-purple-500 text-xl sm:text-2xl font-bold uppercase mb-4 text-center">📸 Your Soul Card</h3>
                            <p className="text-zinc-400 text-sm text-center mb-6">Share your unique soul identity with the world!</p>
                            <SoulCard name={name} birthDate={birthDate} element={elementData.element} />
                        </div>
                    </motion.div>

                    {/* Locked Premium Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative border-2 border-red-600/50 bg-gradient-to-br from-red-950/20 to-black p-6 sm:p-8 md:p-12 overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-5"><div className="absolute inset-0 bg-[linear-gradient(45deg,#dc2626_1px,transparent_1px)] bg-[size:20px_20px]" /></div>
                        <div className="relative z-10">
                            <motion.h3 animate={{ opacity: [1, 0.7, 1], scale: [1, 1.02, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="text-red-500 text-2xl sm:text-3xl md:text-5xl font-bold uppercase mb-6 flex items-center gap-3 justify-center sm:justify-start">
                                <span className="text-3xl md:text-5xl">⚠️</span>Critical Danger Period Detected in 2026
                            </motion.h3>

                            <div className="relative mb-8">
                                <div className={`${!isUnlocked ? 'blur-sm' : ''} select-none space-y-2 text-zinc-300 text-sm sm:text-base leading-relaxed`}>
                                    <p>██████ analysis indicates significant █████ disruption during ████ period...</p>
                                    <p>Your element ({elementData.element.toUpperCase()}) will face challenges from ████████ and ███████████...</p>
                                    <p>Critical health warning: ████████████████████ requires immediate ██████████...</p>
                                    <p>Additional warnings about ████████████████████ and ███████████████...</p>
                                </div>

                                {!isUnlocked && (
                                    <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center p-6">
                                        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-4">
                                            <Lock className="w-16 h-16 sm:w-20 sm:h-20 text-red-500" />
                                        </motion.div>
                                        <p className="text-red-500 text-lg sm:text-xl font-bold uppercase tracking-wider mb-2">Encrypted Data Detected</p>
                                        <p className="text-zinc-400 text-xs sm:text-sm mb-6 text-center px-4">Critical destiny patterns require Level 2 clearance</p>

                                        <div className="mb-6 text-left max-w-md">
                                            <p className="text-zinc-400 text-xs sm:text-sm mb-3 text-center">Unlock Full Report ($4.99):</p>
                                            <div className="space-y-2 text-xs sm:text-sm">
                                                <div className="flex items-center gap-2"><span className="text-green-500 flex-shrink-0">✓</span><span className="text-zinc-300">Complete 2026 Danger Period Analysis</span></div>
                                                <div className="flex items-center gap-2"><span className="text-green-500 flex-shrink-0">✓</span><span className="text-zinc-300">Lifetime Access to Your Report</span></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <Footer />
                </div>
            </main>

            {/* 🔥 PAYMENT BUTTON - COMPLETELY OUTSIDE MAIN TAG 🔥 */}
            {/* This is a SIBLING of main, not a child - fixes CSS stacking context issue */}
            <div className="fixed bottom-0 left-0 w-full z-[99999] p-4 pb-8 bg-gradient-to-t from-black via-black to-transparent">
                <div className="max-w-4xl mx-auto pointer-events-auto">
                    <motion.button
                        onClick={handleUnlock}
                        disabled={isProcessingPayment || isUnlocked}
                        whileHover={!isProcessingPayment && !isUnlocked ? { scale: 1.05 } : {}}
                        whileTap={!isProcessingPayment && !isUnlocked ? { scale: 0.95 } : {}}
                        className="w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 hover:from-yellow-600 hover:via-yellow-700 hover:to-orange-700 disabled:bg-zinc-800 disabled:cursor-not-allowed text-black px-8 py-5 text-lg sm:text-2xl font-extrabold uppercase tracking-wider border-4 border-yellow-400 disabled:border-zinc-700 shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all flex items-center justify-center gap-3"
                    >
                        {isUnlocked ? (
                            "✅ UNLOCKED - SCROLL TO VIEW"
                        ) : isProcessingPayment ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "🔓 UNLOCK FULL SOULFILE ($4.99)"
                        )}
                    </motion.button>
                    <p className="text-zinc-500 text-xs mt-2 text-center">
                        {isUnlocked ? "Enjoy your complete analysis above ↑" : "MVP Test: Auto-unlocks after 2s"}
                    </p>
                </div>
            </div>
        </>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-red-600">Loading...</div>}>
            <ReportContent />
        </Suspense>
    );
}
