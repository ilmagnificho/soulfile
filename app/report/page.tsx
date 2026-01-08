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
import { createCheckout, redirectToCheckout } from "@/lib/lemonsqueezy";

// Map elements to icons
const elementIcons = {
    fire: Flame,
    water: Droplet,
    wood: TreePine,
    metal: Hammer,
    earth: Mountain,
};

// Generate random stats for radar chart (in production, calculate these)
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
    const time = searchParams.get("time") || "00:00";
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const elementData = calculateElement(birthDate);
    const ElementIcon = elementIcons[elementData.element];
    const stats = generateStats(elementData.element);

    const handleUnlock = async () => {
        setIsProcessingPayment(true);
        try {
            const checkoutUrl = await createCheckout({
                name,
                birthDate,
                element: elementData.element,
            });
            redirectToCheckout(checkoutUrl);
        } catch (error) {
            console.error("Payment error:", error);
            alert("Unable to process payment. Please try again.");
            setIsProcessingPayment(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
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
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors text-xs sm:text-sm uppercase tracking-wider mb-4"
                    >
                        <span>←</span> Return to Terminal
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

                {/* Main Grid: 1 column mobile, 2 columns desktop */}
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
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-purple-600/10" />

                            <div className="relative z-10">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    {/* Element Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, opacity: [1, 0.9, 1] }}
                                        transition={{
                                            scale: { delay: 0.4, type: "spring" },
                                            opacity: { duration: 2, repeat: Infinity }
                                        }}
                                        className={`w-40 h-40 md:w-56 md:h-56 rounded-full border-4 ${elementData.element === "fire" ? "border-red-600 bg-red-600/20" :
                                            elementData.element === "water" ? "border-blue-600 bg-blue-600/20" :
                                                elementData.element === "wood" ? "border-green-600 bg-green-600/20" :
                                                    elementData.element === "metal" ? "border-zinc-400 bg-zinc-400/20" :
                                                        "border-amber-600 bg-amber-600/20"
                                            } flex items-center justify-center`}
                                        style={{
                                            boxShadow: `
                                            0 0 30px ${elementData.element === "fire" ? "rgba(220, 38, 38, 0.6)" :
                                                    elementData.element === "water" ? "rgba(37, 99, 235, 0.6)" :
                                                        elementData.element === "wood" ? "rgba(22, 163, 74, 0.6)" :
                                                            elementData.element === "metal" ? "rgba(161, 161, 170, 0.6)" :
                                                                "rgba(217, 119, 6, 0.6)"
                                                },
                                            0 0 60px ${elementData.element === "fire" ? "rgba(220, 38, 38, 0.3)" :
                                                    elementData.element === "water" ? "rgba(37, 99, 235, 0.3)" :
                                                        elementData.element === "wood" ? "rgba(22, 163, 74, 0.3)" :
                                                            elementData.element === "metal" ? "rgba(161, 161, 170, 0.3)" :
                                                                "rgba(217, 119, 6, 0.3)"
                                                }
                                          `
                                        }}
                                    >
                                        <ElementIcon className="w-24 h-24 md:w-32 md:h-32" />
                                    </motion.div>

                                    {/* Element Info */}
                                    <div className="text-center sm:text-left">
                                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                                            Primary Element
                                        </p>
                                        <h2 className={`text-4xl sm:text-5xl font-bold ${elementData.color} mb-2`}>
                                            {elementData.element.toUpperCase()}
                                        </h2>
                                        <p className="text-zinc-400 text-sm sm:text-base">{elementData.description}</p>
                                    </div>
                                </div>

                                {/* Traits */}
                                <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
                                    {elementData.traits.map((trait, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 + i * 0.1 }}
                                            className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs uppercase tracking-wider text-zinc-400"
                                        >
                                            {trait}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="border border-zinc-800 bg-black/50 p-4 sm:p-6 space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase mb-1">Birth Date</p>
                                    <p className="font-mono text-white">{birthDate}</p>
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-xs uppercase mb-1">Time</p>
                                    <p className="font-mono text-white">{time}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Stats Radar Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Radar Chart */}
                        <div className="border-2 border-zinc-800 bg-black/50 p-4 sm:p-6">
                            <h3 className="text-red-500 uppercase tracking-wider text-sm sm:text-lg font-bold mb-4 text-center"
                                style={{
                                    textShadow: `0 0 10px rgba(220, 38, 38, 0.6)`
                                }}>
                                Soul Analysis Matrix
                            </h3>
                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={stats}>
                                        <PolarGrid stroke="#3f3f46" />
                                        <PolarAngleAxis
                                            dataKey="stat"
                                            tick={{ fill: '#a1a1aa', fontSize: 12 }}
                                        />
                                        <PolarRadiusAxis
                                            angle={90}
                                            domain={[0, 100]}
                                            tick={{ fill: '#71717a', fontSize: 10 }}
                                        />
                                        <Radar
                                            name="Stats"
                                            dataKey="value"
                                            stroke="#dc2626"
                                            fill="#dc2626"
                                            fillOpacity={0.5}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Viral Soul Card Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-8"
                >
                    <div className="border-2 border-purple-600/30 bg-gradient-to-br from-purple-950/20 to-pink-950/20 p-6 sm:p-8">
                        <h3 className="text-purple-500 text-xl sm:text-2xl font-bold uppercase mb-4 text-center"
                            style={{
                                textShadow: `0 0 10px rgba(168, 85, 247, 0.6)`
                            }}>
                            📸 Your Soul Card
                        </h3>
                        <p className="text-zinc-400 text-sm text-center mb-6">
                            Share your unique soul identity with the world! Download or share your personalized Soul Card.
                        </p>
                        <SoulCard
                            name={name}
                            birthDate={birthDate}
                            element={elementData.element}
                            elementColor={elementData.color}
                            stats={stats}
                        />
                    </div>
                </motion.div>

                {/* Locked Premium Section - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative border-2 border-red-600/50 bg-gradient-to-br from-red-950/20 to-black p-6 sm:p-8 md:p-12 overflow-hidden"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,#dc2626_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    <div className="relative z-10">
                        <motion.h3
                            animate={{
                                opacity: [1, 0.7, 1],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-red-500 text-2xl sm:text-3xl md:text-5xl font-bold uppercase mb-6 flex items-center gap-3 justify-center sm:justify-start"
                            style={{
                                textShadow: `
                                0 0 15px rgba(220, 38, 38, 1),
                                0 0 30px rgba(220, 38, 38, 0.7),
                                0 0 45px rgba(220, 38, 38, 0.4)
                              `
                            }}>
                            <span className="text-3xl md:text-5xl">⚠️</span>
                            Critical Danger Period Detected in 2026
                        </motion.h3>

                        {/* Blurred Content */}
                        <div className="relative mb-8">
                            {/* The blurred preview text */}
                            <div className="blur-sm select-none space-y-2 text-zinc-300 text-sm sm:text-base leading-relaxed">
                                <p>██████ analysis indicates significant █████ disruption during ████ period...</p>
                                <p>Your element ({elementData.element.toUpperCase()}) will face challenges from ████████ and ███████████...</p>
                                <p>██████ will bring unexpected ████████ in March 2026, followed by ████████████...</p>
                                <p>Relationship warning: ████████████████ between ██/██ and ██/██ may cause ███████...</p>
                                <p>Financial opportunity: ██████████ between ██/██ and ██/██ offers ████████ potential...</p>
                                <p>Recommended protective measures: ████████, ██████████, and daily ████ rituals...</p>
                                <p>Lucky dates: ██/██, ██/██, and ██/██ (marked for ████████ success)...</p>
                                <p>Unlucky periods: ████████ to ████████ and ██████ to ██████ (avoid major decisions)...</p>
                                <p>Critical health warning: ████████████████████ requires immediate ██████████...</p>
                                <p>Career insights: ████████ shift expected in ████, prepare with ███████████...</p>
                                <p>Spiritual guidance: ████████ meditation on ██████ will strengthen ████████ protection...</p>
                                <p>Additional warnings about ████████████████████ and ███████████████...</p>
                            </div>

                            {/* Lock Overlay */}
                            <div className="absolute inset-0 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="mb-4"
                                >
                                    <Lock className="w-16 h-16 sm:w-20 sm:h-20 text-red-500" />
                                </motion.div>

                                <p className="text-red-500 text-lg sm:text-xl font-bold uppercase tracking-wider mb-2">
                                    Encrypted Data Detected
                                </p>
                                <p className="text-zinc-400 text-xs sm:text-sm mb-6 text-center px-4">
                                    Critical destiny patterns require Level 2 clearance
                                </p>

                                {/* What You Get List */}
                                <div className="mb-6 text-left max-w-md">
                                    <p className="text-zinc-400 text-xs sm:text-sm mb-3 text-center">
                                        Unlock Full Report ($4.99):
                                    </p>
                                    <div className="space-y-2 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 flex-shrink-0">✓</span>
                                            <span className="text-zinc-300">Complete 2026 Monthly Forecast</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 flex-shrink-0">✓</span>
                                            <span className="text-zinc-300">Lucky & Unlucky Dates</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 flex-shrink-0">✓</span>
                                            <span className="text-zinc-300">Relationship Compatibility Analysis</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 flex-shrink-0">✓</span>
                                            <span className="text-zinc-300">High-Res Digital Pujeok (Download)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 flex-shrink-0">✓</span>
                                            <span className="text-zinc-300">Lifetime Access to Your Report</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button with intense pulsing glow */}
                                <motion.button
                                    onClick={handleUnlock}
                                    disabled={isProcessingPayment}
                                    whileHover={!isProcessingPayment ? { scale: 1.08, rotate: 1 } : {}}
                                    whileTap={!isProcessingPayment ? { scale: 0.92 } : {}}
                                    animate={!isProcessingPayment ? {
                                        boxShadow: [
                                            "0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)",
                                            "0 0 50px rgba(220, 38, 38, 1), 0 0 100px rgba(220, 38, 38, 0.7), 0 0 150px rgba(220, 38, 38, 0.4)",
                                            "0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)",
                                        ],
                                        scale: [1, 1.03, 1]
                                    } : {}}
                                    transition={{
                                        boxShadow: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        scale: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 disabled:bg-zinc-800 disabled:cursor-not-allowed text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-xl font-bold uppercase tracking-wider border-2 border-yellow-500 disabled:border-zinc-700 transition-all flex items-center justify-center gap-3"
                                    style={!isProcessingPayment ? { willChange: "transform, box-shadow" } : {}}
                                >
                                    {isProcessingPayment ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "🔓 UNLOCK SOULFILE 2026 ($4.99)"
                                    )}
                                </motion.button>

                                <p className="text-zinc-600 text-xs mt-4">
                                    Secure checkout by Lemon Squeezy 🍋
                                </p>

                                {/* Bonus Item Notice */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="mt-6 border border-zinc-700 bg-black/50 px-4 py-2 text-xs text-zinc-400"
                                >
                                    ✨ Bonus: Anti-Bad-Luck Charm included
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="mt-8 sm:mt-12 text-center">
                    <p className="text-zinc-600 text-xs uppercase tracking-wider">
                        This soul file is managed by the Saja Boys
                    </p>
                    <p className="text-zinc-700 text-xs mt-2 font-mono">
                        CLASSIFIED // NETHERWORLD DATABASE
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center text-red-600">
                Loading...
            </div>
        }>
            <ReportContent />
        </Suspense>
    );
}
