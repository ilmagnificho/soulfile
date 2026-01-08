"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Share2 } from "lucide-react";

interface SoulCardProps {
    name: string;
    birthDate: string;
    element: "fire" | "water" | "wood" | "metal" | "earth" | string;
}

const elementAccents: Record<string, { primary: string; secondary: string; seal: string }> = {
    fire: { primary: "#D4AF37", secondary: "#B8860B", seal: "火" },
    water: { primary: "#C0C0C0", secondary: "#A9A9A9", seal: "水" },
    wood: { primary: "#90EE90", secondary: "#228B22", seal: "木" },
    metal: { primary: "#E8E8E8", secondary: "#C0C0C0", seal: "金" },
    earth: { primary: "#DAA520", secondary: "#B8860B", seal: "土" },
};

export default function SoulCard({ name, birthDate, element }: SoulCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const accent = elementAccents[element] || elementAccents.earth;

    // Stable card number - memoized to prevent re-renders
    const cardNumber = useMemo(() => {
        const hash = (name + birthDate).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        return `${String(hash % 10000).padStart(4, '0')} ${String((hash * 7) % 10000).padStart(4, '0')} ${String((hash * 13) % 10000).padStart(4, '0')} ${String((hash * 17) % 10000).padStart(4, '0')}`;
    }, [name, birthDate]);

    // Stable barcode pattern
    const barcodePattern = useMemo(() => {
        return Array.from({ length: 35 }).map((_, i) => ({
            width: (i * 7 + 3) % 2 === 0 ? 2 : 1,
            opacity: 0.3 + ((i * 11) % 30) / 100,
        }));
    }, []);

    const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 3,
                backgroundColor: '#0a0a0a',
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
            const dataUrl = await toPng(cardRef.current, { quality: 1.0, pixelRatio: 3 });
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `SOULFILE_${name}_2026.png`, { type: "image/png" });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: "My SOULFILE 2026",
                    text: `My soul element: ${element.toUpperCase()}`,
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
            {/* Premium Black Card */}
            <div
                ref={cardRef}
                className="relative w-[340px] h-[200px] rounded-xl overflow-hidden"
                style={{
                    background: `linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #141414 100%)`,
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)`,
                }}
            >
                {/* Subtle noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Top Row - Chip + Brand + Year */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {/* Chip + Brand */}
                    <div className="flex items-center gap-3">
                        {/* Card chip */}
                        <div
                            className="w-9 h-7 rounded-sm"
                            style={{
                                background: `linear-gradient(135deg, ${accent.primary} 0%, ${accent.secondary} 100%)`,
                                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
                            }}
                        >
                            <div className="w-full h-full grid grid-cols-3 gap-[1px] p-[2px]">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="bg-black/30 rounded-[1px]" />
                                ))}
                            </div>
                        </div>
                        {/* Brand */}
                        <div>
                            <p
                                className="text-[9px] font-bold tracking-[0.2em] uppercase"
                                style={{ color: accent.primary }}
                            >
                                SOULFILE
                            </p>
                            <p className="text-[6px] text-zinc-600 tracking-widest">CYBER-SHAMANISM</p>
                        </div>
                    </div>

                    {/* Year Badge */}
                    <div
                        className="px-2 py-1 rounded text-[8px] font-bold tracking-wider"
                        style={{
                            backgroundColor: `${accent.primary}15`,
                            color: accent.primary,
                            border: `1px solid ${accent.primary}30`,
                        }}
                    >
                        2026
                    </div>
                </div>

                {/* Card Number - Positioned clearly below header row */}
                <div className="absolute top-[75px] left-4 right-4">
                    <p
                        className="font-mono text-sm tracking-[0.12em] text-center"
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                    >
                        {cardNumber}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-8 left-4 right-4 flex justify-between items-end">
                    {/* Name & Element */}
                    <div>
                        <p className="text-[8px] text-zinc-600 uppercase tracking-wider mb-0.5">Subject</p>
                        <p
                            className="text-xs font-semibold uppercase tracking-wide"
                            style={{ color: 'rgba(255,255,255,0.9)' }}
                        >
                            {name}
                        </p>
                        <p
                            className="text-[9px] uppercase tracking-[0.15em] mt-0.5"
                            style={{ color: accent.primary }}
                        >
                            {element.toUpperCase()} ELEMENT
                        </p>
                    </div>

                    {/* Seal */}
                    <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center"
                        style={{
                            borderColor: `${accent.primary}50`,
                            background: `radial-gradient(circle, rgba(0,0,0,0.3), rgba(20,20,20,0.8))`,
                        }}
                    >
                        <span
                            className="text-lg font-bold"
                            style={{
                                color: accent.primary,
                                textShadow: `0 0 8px ${accent.primary}40`,
                            }}
                        >
                            {accent.seal}
                        </span>
                    </div>
                </div>

                {/* Barcode at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center justify-center gap-[1px] px-4 bg-black/60">
                    {barcodePattern.map((bar, i) => (
                        <div
                            key={i}
                            className="h-2.5"
                            style={{
                                width: `${bar.width}px`,
                                backgroundColor: `rgba(255,255,255,${bar.opacity})`,
                            }}
                        />
                    ))}
                </div>

                {/* Top accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accent.primary}60, transparent)`,
                    }}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <motion.button
                    onClick={shareCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs hover:bg-zinc-800 hover:border-zinc-600 transition-all rounded"
                >
                    <Share2 className="w-3.5 h-3.5" />
                    SHARE
                </motion.button>
                <motion.button
                    onClick={downloadCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs hover:bg-zinc-800 hover:border-zinc-600 transition-all rounded"
                >
                    <Download className="w-3.5 h-3.5" />
                    DOWNLOAD
                </motion.button>
            </div>
        </div>
    );
}
