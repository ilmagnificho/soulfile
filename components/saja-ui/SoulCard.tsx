"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
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
    const [isSharing, setIsSharing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const elementColor = elementColors[element];
    const hangul = elementKorean[element];

    const generateImage = async (): Promise<Blob | null> => {
        if (!cardRef.current) return null;

        try {
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                width: 350,
                height: 550,
                pixelRatio: 2,
            });

            const response = await fetch(dataUrl);
            return await response.blob();
        } catch (error) {
            console.error("Failed to generate image:", error);
            return null;
        }
    };

    const shareCard = async () => {
        setIsSharing(true);
        try {
            const blob = await generateImage();
            if (!blob) throw new Error("Failed to generate image");

            const fileName = `soulfile-${name.replace(/\s+/g, "_")}.png`;
            const file = new File([blob], fileName, { type: "image/png" });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: "My SOULFILE 2026",
                    text: `Check out my soul identity: ${element.toUpperCase()} (${hangul})`,
                    files: [file],
                });
            } else {
                // Fallback to download
                const link = document.createElement("a");
                link.download = fileName;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }
        } catch (error) {
            console.error("Failed to share:", error);
        } finally {
            setIsSharing(false);
        }
    };

    const downloadCard = async () => {
        setIsDownloading(true);
        try {
            const blob = await generateImage();
            if (!blob) throw new Error("Failed to generate image");

            const link = document.createElement("a");
            link.download = `soulfile-${name.replace(/\s+/g, "_")}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error("Failed to download:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* K-Cyber Soul Card */}
            <div className="flex justify-center">
                <div
                    ref={cardRef}
                    className="relative overflow-hidden"
                    style={{
                        width: "350px",
                        height: "550px",
                        background: `
                            linear-gradient(135deg, 
                                ${elementColor}20 0%, 
                                #000000 50%,
                                ${elementColor}10 100%
                            )
                        `,
                        border: `2px solid ${elementColor}60`,
                    }}
                >
                    {/* Holographic overlay */}
                    <div
                        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                        style={{
                            background: `
                                repeating-linear-gradient(
                                    45deg,
                                    transparent,
                                    transparent 10px,
                                    rgba(255, 0, 255, 0.1) 10px,
                                    rgba(255, 0, 255, 0.1) 20px
                                ),
                                repeating-linear-gradient(
                                    -45deg,
                                    transparent,
                                    transparent 10px,
                                    rgba(0, 255, 255, 0.1) 10px,
                                    rgba(0, 255, 255, 0.1) 20px
                                )
                            `,
                        }}
                    />

                    {/* Noise texture */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-6">
                        {/* Header - SIM Card Style */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-10 h-10 border-2 grid grid-cols-3 gap-[2px] p-1"
                                    style={{ borderColor: elementColor }}
                                >
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="rounded-sm"
                                            style={{ backgroundColor: `${elementColor}80` }}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xs tracking-widest">SOUL IDENTITY</p>
                                    <p className="text-zinc-500 text-[8px] uppercase tracking-wider">Cyber-Shamanism v2.6</p>
                                </div>
                            </div>
                        </div>

                        {/* Large Glowing Hangul */}
                        <div className="flex-1 flex items-center justify-center">
                            <div
                                className="text-[160px] font-bold leading-none"
                                style={{
                                    color: elementColor,
                                    textShadow: `
                                        0 0 20px ${elementColor}FF,
                                        0 0 40px ${elementColor}CC,
                                        0 0 60px ${elementColor}99,
                                        0 0 80px ${elementColor}66,
                                        0 0 100px ${elementColor}33
                                    `,
                                }}
                            >
                                {hangul}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="space-y-2">
                            <div
                                className="text-center pb-3 mb-3"
                                style={{ borderBottom: `1px solid ${elementColor}40` }}
                            >
                                <p
                                    className="text-2xl font-bold uppercase mb-1"
                                    style={{ color: elementColor }}
                                >
                                    {element}
                                </p>
                                <p className="text-zinc-500 text-xs uppercase tracking-wider">Primary Element</p>
                            </div>

                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-zinc-600 uppercase">Subject:</span>
                                    <span className="text-zinc-300 text-right">{name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-600 uppercase">Birth:</span>
                                    <span className="text-zinc-300">{birthDate}</span>
                                </div>
                            </div>

                            {/* Barcode visualization */}
                            <div className="flex gap-[1px] h-6 mt-3">
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1"
                                        style={{
                                            backgroundColor: elementColor,
                                            opacity: Math.random() > 0.5 ? 0.8 : 0.2,
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-center text-[8px] text-zinc-600 uppercase tracking-widest mt-1">
                                SOULFILE-2026-ID
                            </p>
                        </div>
                    </div>

                    {/* Corner accents */}
                    <div
                        className="absolute top-0 right-0 w-20 h-20 opacity-30"
                        style={{
                            background: `linear-gradient(135deg, transparent 50%, ${elementColor} 50%)`,
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-20 h-20 opacity-30"
                        style={{
                            background: `linear-gradient(-45deg, transparent 50%, ${elementColor} 50%)`,
                        }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <motion.button
                    onClick={shareCard}
                    disabled={isSharing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-800 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider transition-all border border-purple-500 disabled:border-zinc-700 flex items-center justify-center gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    {isSharing ? "Sharing..." : "Share"}
                </motion.button>

                <motion.button
                    onClick={downloadCard}
                    disabled={isDownloading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider transition-all border border-zinc-700 disabled:border-zinc-800 flex items-center justify-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Downloading..." : "Download"}
                </motion.button>
            </div>
        </div>
    );
}
