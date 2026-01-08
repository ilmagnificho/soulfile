"use client";

import { useRef } from "react";
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
    wood: { primary: "#D4AF37", secondary: "#228B22", seal: "木" },
    metal: { primary: "#E8E8E8", secondary: "#C0C0C0", seal: "金" },
    earth: { primary: "#DAA520", secondary: "#B8860B", seal: "土" },
};

export default function SoulCard({ name, birthDate, element }: SoulCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const accent = elementAccents[element] || elementAccents.earth;

    const generateCardNumber = () => {
        const hash = (name + birthDate).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        return `${String(hash % 10000).padStart(4, '0')} ${String((hash * 7) % 10000).padStart(4, '0')} ${String((hash * 13) % 10000).padStart(4, '0')} ${String((hash * 17) % 10000).padStart(4, '0')}`;
    };

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
                className="relative w-[350px] h-[220px] rounded-xl overflow-hidden"
                style={{
                    background: `linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #141414 100%)`,
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)`,
                }}
            >
                {/* Subtle chip texture overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Card chip */}
                <div
                    className="absolute top-6 left-6 w-10 h-8 rounded-sm"
                    style={{
                        background: `linear-gradient(135deg, ${accent.primary} 0%, ${accent.secondary} 100%)`,
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
                    }}
                >
                    <div className="w-full h-full grid grid-cols-3 gap-[1px] p-[3px]">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-black/30 rounded-[1px]" />
                        ))}
                    </div>
                </div>

                {/* Top Left - Brand */}
                <div className="absolute top-6 left-20">
                    <p
                        className="text-[10px] font-bold tracking-[0.3em] uppercase"
                        style={{ color: accent.primary }}
                    >
                        SOULFILE
                    </p>
                    <p className="text-[7px] text-zinc-600 tracking-widest">INC.</p>
                </div>

                {/* Top Right - Access Status */}
                <div className="absolute top-6 right-6 text-right">
                    <p className="text-[8px] text-zinc-500 tracking-wider">2026</p>
                    <p
                        className="text-[9px] font-semibold tracking-wide"
                        style={{ color: accent.primary }}
                    >
                        ACCESS GRANTED
                    </p>
                </div>

                {/* Center - Card Number */}
                <div className="absolute top-16 left-6 right-6">
                    <p
                        className="font-mono text-lg tracking-[0.2em]"
                        style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                        {generateCardNumber()}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    {/* Name & Element */}
                    <div>
                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">Subject</p>
                        <p
                            className="text-sm font-semibold uppercase tracking-wide"
                            style={{ color: 'rgba(255,255,255,0.9)' }}
                        >
                            {name}
                        </p>
                        <p
                            className="text-[10px] uppercase tracking-[0.2em] mt-1"
                            style={{ color: accent.primary }}
                        >
                            {element} Element
                        </p>
                    </div>

                    {/* Seal */}
                    <div
                        className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                        style={{
                            borderColor: `${accent.primary}40`,
                            background: `linear-gradient(145deg, rgba(0,0,0,0.5), rgba(20,20,20,0.8))`,
                        }}
                    >
                        <span
                            className="text-xl font-bold"
                            style={{
                                color: accent.primary,
                                textShadow: `0 0 10px ${accent.primary}40`,
                            }}
                        >
                            {accent.seal}
                        </span>
                    </div>
                </div>

                {/* Barcode at bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center gap-[1px] px-6 bg-black/50">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-3"
                            style={{
                                width: Math.random() > 0.5 ? '2px' : '1px',
                                backgroundColor: `rgba(255,255,255,${0.2 + Math.random() * 0.3})`,
                            }}
                        />
                    ))}
                </div>

                {/* Holographic line accent */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accent.primary}60, transparent)`,
                    }}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <motion.button
                    onClick={shareCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 hover:border-zinc-600 transition-all"
                >
                    <Share2 className="w-4 h-4" />
                    SHARE
                </motion.button>
                <motion.button
                    onClick={downloadCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 hover:border-zinc-600 transition-all"
                >
                    <Download className="w-4 h-4" />
                    DOWNLOAD
                </motion.button>
            </div>
        </div>
    );
}
