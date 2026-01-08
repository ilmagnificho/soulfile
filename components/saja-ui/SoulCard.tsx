"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

interface SoulCardProps {
    name: string;
    birthDate: string;
    element: "fire" | "water" | "wood" | "metal" | "earth";
}

const elementColors = {
    fire: "#DC2626",
    water: "#2563EB",
    wood: "#16A34A",
    metal: "#A1A1AA",
    earth: "#D97706",
};

const elementKorean = {
    fire: "화",
    water: "수",
    wood: "목",
    metal: "금",
    earth: "토",
};

export default function SoulCard({ name, birthDate, element }: SoulCardProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const downloadCard = async () => {
        if (!cardRef.current) return;

        setIsDownloading(true);
        try {
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                width: 350,
                height: 550,
                pixelRatio: 2,
            });

            const link = document.createElement("a");
            link.download = `soulfile-${name.replace(/\\s+/g, "_")}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Failed to download Soul Card:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const elementColor = elementColors[element];

    return (
        <div className="space-y-6">
            {/* Confidential File Card */}
            <div className="flex justify-center">
                <div
                    ref={cardRef}
                    className="relative overflow-hidden font-mono"
                    style={{
                        width: "350px",
                        height: "550px",
                        backgroundColor: "#18181b", // Dark grey file folder
                        border: "2px solid #3f3f46",
                    }}
                >
                    {/* Paper texture overlay */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-8 text-zinc-300">
                        {/* Top Bar with File Number */}
                        <div className="border-b border-zinc-700 pb-4 mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Classification Level</p>
                                    <p className="text-xs text-zinc-400 mt-1">TOP SECRET</p>
                                </div>
                                {/* CONFIDENTIAL Stamp */}
                                <div
                                    className="border-2 border-red-600 px-3 py-1 transform rotate-12"
                                    style={{
                                        boxShadow: 'inset 0 0 10px rgba(220, 38, 38, 0.3)',
                                    }}
                                >
                                    <span className="text-red-600 text-xs font-bold uppercase tracking-wider">CONFIDENTIAL</span>
                                </div>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-6 border-b border-zinc-800 pb-4">
                            <h1 className="text-lg font-bold tracking-widest text-white mb-1">SOULFILE ARCHIVES</h1>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Netherworld Database v2.6</p>
                        </div>

                        {/* Subject Information */}
                        <div className="space-y-3 mb-6">
                            <div className="flex">
                                <span className="text-xs text-zinc-600 w-20 uppercase">Subject:</span>
                                <span className="text-xs text-white flex-1 uppercase">{name}</span>
                            </div>
                            <div className="flex">
                                <span className="text-xs text-zinc-600 w-20 uppercase">DOB:</span>
                                <span className="text-xs text-white flex-1">{birthDate}</span>
                            </div>
                            <div className="flex">
                                <span className="text-xs text-zinc-600 w-20 uppercase">File No:</span>
                                <span className="text-xs text-white flex-1">SF-{birthDate.replace(/-/g, "")}-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Core Element Section - Large */}
                        <div className="flex-1 flex flex-col items-center justify-center border-t border-b border-zinc-800 py-6 my-4">
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3">Core Element Classification</p>

                            {/* Large Element Character */}
                            <div
                                className="text-8xl font-bold mb-2"
                                style={{ color: elementColor }}
                            >
                                {elementKorean[element]}
                            </div>

                            <div className="text-center">
                                <p
                                    className="text-2xl font-bold uppercase mb-1"
                                    style={{ color: elementColor }}
                                >
                                    {element}
                                </p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Primary Designation</p>
                            </div>

                            {/* Redaction bars for style */}
                            <div className="mt-4 w-full space-y-1">
                                <div className="h-2 bg-black w-3/4 mx-auto"></div>
                                <div className="h-2 bg-black w-1/2 mx-auto"></div>
                            </div>
                        </div>

                        {/* Barcode Footer */}
                        <div className="mt-auto">
                            <div className="flex justify-between items-center text-[9px] text-zinc-600 mb-2">
                                <span>AUTH: SYSTEM</span>
                                <span>ENC: AES-256</span>
                            </div>
                            {/* Barcode effect */}
                            <div className="flex gap-[2px] h-8">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-zinc-700"
                                        style={{
                                            opacity: Math.random() > 0.5 ? 1 : 0.3,
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-center text-[8px] text-zinc-600 mt-1 uppercase tracking-widest">
                                SOULFILE-2026-{birthDate.slice(0, 4)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <motion.button
                onClick={downloadCard}
                disabled={isDownloading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-900 hover:bg-red-800 disabled:bg-zinc-800 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider transition-all border border-red-700 disabled:border-zinc-700 flex items-center justify-center gap-2"
            >
                <Download className="w-4 h-4" />
                {isDownloading ? "Generating..." : "📥 Download Soul File"}
            </motion.button>
        </div>
    );
}
