"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Share2, Sparkles } from "lucide-react";

interface SoulCardProps {
    name: string;
    birthDate: string;
    element: "fire" | "water" | "wood" | "metal" | "earth" | string;
}

const elementStyles: Record<string, {
    gradient: string;
    accent: string;
    glow: string;
    seal: string;
    symbol: string;
}> = {
    fire: {
        gradient: "from-red-900/30 via-orange-900/20 to-amber-900/10",
        accent: "#FF6B35",
        glow: "rgba(255,107,53,0.5)",
        seal: "火",
        symbol: "🔥"
    },
    water: {
        gradient: "from-blue-900/30 via-cyan-900/20 to-teal-900/10",
        accent: "#00D4FF",
        glow: "rgba(0,212,255,0.5)",
        seal: "水",
        symbol: "🌊"
    },
    wood: {
        gradient: "from-green-900/30 via-emerald-900/20 to-teal-900/10",
        accent: "#4ADE80",
        glow: "rgba(74,222,128,0.5)",
        seal: "木",
        symbol: "🌲"
    },
    metal: {
        gradient: "from-zinc-700/30 via-slate-800/20 to-gray-900/10",
        accent: "#E2E8F0",
        glow: "rgba(226,232,240,0.5)",
        seal: "金",
        symbol: "⚔️"
    },
    earth: {
        gradient: "from-amber-900/30 via-yellow-900/20 to-orange-900/10",
        accent: "#FBBF24",
        glow: "rgba(251,191,36,0.5)",
        seal: "土",
        symbol: "⛰️"
    },
};

export default function SoulCard({ name, birthDate, element }: SoulCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const style = elementStyles[element] || elementStyles.earth;

    // Extract year from birthDate
    const birthYear = birthDate.split('-')[0] || '????';

    // Generate stable card ID
    const cardId = useMemo(() => {
        const hash = (name + birthDate).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        return `SF-${birthYear}-${String(hash % 10000).padStart(4, '0')}`;
    }, [name, birthDate, birthYear]);

    const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 3,
                backgroundColor: '#000000',
            });
            const link = document.createElement("a");
            link.download = `SOULFILE_${name.replace(/\s/g, '_')}_2026.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to generate card:", err);
        }
    };

    const shareCard = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, { quality: 1.0, pixelRatio: 3, backgroundColor: '#000000' });
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `SOULFILE_${name}_2026.png`, { type: "image/png" });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: "My SOULFILE 2026",
                    text: `I'm ${element.toUpperCase()} element! ${style.symbol} What's yours? soulfile.xyz`,
                    files: [file],
                });
            } else {
                downloadCard();
            }
        } catch (err) {
            downloadCard();
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Premium Instagram-Ready Soul Card */}
            <div
                ref={cardRef}
                className="relative w-[360px] aspect-square rounded-3xl overflow-hidden"
                style={{
                    background: `linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)`,
                    boxShadow: `0 25px 80px -20px ${style.glow}, 0 0 0 1px rgba(255,255,255,0.08)`,
                }}
            >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-60`} />

                {/* Noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-16 h-[1px]" style={{ background: `linear-gradient(90deg, ${style.accent}, transparent)` }} />
                <div className="absolute top-0 left-0 w-[1px] h-16" style={{ background: `linear-gradient(180deg, ${style.accent}, transparent)` }} />
                <div className="absolute top-0 right-0 w-16 h-[1px]" style={{ background: `linear-gradient(270deg, ${style.accent}, transparent)` }} />
                <div className="absolute top-0 right-0 w-[1px] h-16" style={{ background: `linear-gradient(180deg, ${style.accent}, transparent)` }} />

                {/* Header */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div>
                        <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">SOULFILE</p>
                        <p className="text-[8px] text-zinc-600 tracking-widest mt-0.5">CYBER-SHAMANISM™</p>
                    </div>
                    <div
                        className="px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider"
                        style={{
                            background: `${style.accent}15`,
                            color: style.accent,
                            border: `1px solid ${style.accent}40`,
                        }}
                    >
                        2026
                    </div>
                </div>

                {/* Central Element Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                    {/* Big Element Symbol */}
                    <div
                        className="text-7xl mb-2"
                        style={{
                            filter: `drop-shadow(0 0 30px ${style.glow})`,
                        }}
                    >
                        {style.symbol}
                    </div>

                    {/* Element Seal */}
                    <div
                        className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4"
                        style={{
                            borderColor: style.accent,
                            background: `radial-gradient(circle, ${style.accent}20, transparent)`,
                            boxShadow: `0 0 40px ${style.glow}, inset 0 0 20px ${style.accent}10`,
                        }}
                    >
                        <span
                            className="text-3xl font-bold"
                            style={{
                                color: style.accent,
                                textShadow: `0 0 20px ${style.accent}`,
                            }}
                        >
                            {style.seal}
                        </span>
                    </div>

                    {/* Element Name */}
                    <p
                        className="text-2xl font-bold tracking-[0.2em] uppercase mb-1"
                        style={{ color: style.accent }}
                    >
                        {element}
                    </p>
                    <p className="text-[10px] text-zinc-500 tracking-widest uppercase">ELEMENT</p>
                </div>

                {/* Subject Info - Bottom */}
                <div className="absolute bottom-6 left-6 right-6">
                    {/* Divider line */}
                    <div className="h-[1px] w-full bg-zinc-800 mb-4" />

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[8px] text-zinc-600 tracking-widest uppercase mb-1">SUBJECT</p>
                            <p className="text-lg font-bold text-white tracking-wide uppercase">
                                {name}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] text-zinc-600 tracking-widest uppercase mb-1">ID</p>
                            <p className="text-xs font-mono text-zinc-400">{cardId}</p>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <Sparkles
                    className="absolute top-6 right-20 w-3 h-3 opacity-30"
                    style={{ color: style.accent }}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <motion.button
                    onClick={shareCard}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                    style={{
                        background: `linear-gradient(135deg, ${style.accent}20, ${style.accent}10)`,
                        color: style.accent,
                        border: `1px solid ${style.accent}40`,
                    }}
                >
                    <Share2 className="w-4 h-4" />
                    Share
                </motion.button>
                <motion.button
                    onClick={downloadCard}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-all"
                >
                    <Download className="w-4 h-4" />
                    Save
                </motion.button>
            </div>
        </div>
    );
}
