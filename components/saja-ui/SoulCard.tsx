"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Flame, Droplet, TreePine, Hammer, Mountain, Download, Share2 } from "lucide-react";
import Talisman from "./Talisman";

interface SoulCardProps {
    name: string;
    birthDate: string;
    element: "fire" | "water" | "wood" | "metal" | "earth";
    elementColor: string;
    stats: Array<{ stat: string; value: number }>;
}

const elementIcons = {
    fire: Flame,
    water: Droplet,
    wood: TreePine,
    metal: Hammer,
    earth: Mountain,
};

const elementGradients = {
    fire: "from-red-950 via-orange-950 to-red-950",
    water: "from-blue-950 via-cyan-950 to-blue-950",
    wood: "from-green-950 via-emerald-950 to-green-950",
    metal: "from-zinc-800 via-slate-800 to-zinc-800",
    earth: "from-amber-950 via-yellow-950 to-amber-950",
};

export default function SoulCard({ name, birthDate, element, elementColor, stats }: SoulCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const ElementIcon = elementIcons[element];

    const downloadCard = async () => {
        if (cardRef.current === null) return;

        try {
            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                width: 1080,
                height: 1920,
                pixelRatio: 2,
            });

            const link = document.createElement("a");
            link.download = `saja-soul-card-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to download image:", err);
        }
    };

    const shareCard = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `My Saja Soul Analysis - ${element.toUpperCase()}`,
                    text: `I'm a ${element.toUpperCase()} element! Discover your soul identity at The Saja Archives.`,
                    url: window.location.origin,
                });
            } catch (err) {
                console.log("Share cancelled");
            }
        } else {
            // Fallback: copy link
            navigator.clipboard.writeText(window.location.origin);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="space-y-6">
            {/* Soul Card Preview - IG Story size */}
            <div className="flex justify-center">
                <div
                    ref={cardRef}
                    className={`relative bg-gradient-to-br ${elementGradients[element]} overflow-hidden`}
                    style={{
                        width: "350px",
                        height: "600px",
                    }}
                >
                    {/* Holographic overlay effect */}
                    <div
                        className="absolute inset-0 opacity-30 mix-blend-overlay"
                        style={{
                            background: `
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.05) 0px,
                transparent 2px,
                transparent 4px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.05) 0px,
                transparent 2px,
                transparent 4px
              )
            `,
                        }}
                    />

                    {/* Noise texture */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-between p-8 sm:p-12">
                        {/* Header */}
                        <div className="text-center">
                            <div className="inline-block border border-red-600 px-6 py-2 mb-4">
                                <span className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold">
                                    CLASSIFIED
                                </span>
                            </div>
                            <h1
                                className="text-3xl sm:text-4xl font-bold text-white mb-2"
                                style={{
                                    textShadow: `
                  0 0 10px rgba(220, 38, 38, 0.8),
                  0 0 20px rgba(220, 38, 38, 0.4)
                `,
                                }}
                            >
                                SOULFILE
                            </h1>
                            <p className="text-zinc-400 text-sm uppercase tracking-wider">
                                Your Destiny, Decrypted.
                            </p>
                        </div>

                        {/* Element Icon */}
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 flex items-center justify-center`}
                                style={{
                                    borderColor: elementColor,
                                    backgroundColor: `${elementColor}20`,
                                    boxShadow: `0 0 30px ${elementColor}60, 0 0 60px ${elementColor}30`,
                                }}
                            >
                                <ElementIcon className="w-20 h-20 sm:w-24 sm:h-24" style={{ color: elementColor }} />
                            </div>

                            <div className="text-center">
                                <p className="text-zinc-500 text-xs uppercase mb-1">Primary Element</p>
                                <h2 className="text-5xl font-bold mb-2" style={{ color: elementColor }}>
                                    {element.toUpperCase()}
                                </h2>
                            </div>
                        </div>

                        {/* Soul Analysis Pentagon */}
                        <div className="w-full max-w-xs">
                            <p className="text-red-500 text-xs uppercase tracking-wider text-center mb-3">
                                Soul Analysis Matrix
                            </p>
                            <div className="h-48 sm:h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={stats}>
                                        <PolarGrid stroke="#3f3f46" />
                                        <PolarAngleAxis dataKey="stat" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                                        <Radar
                                            name="Stats"
                                            dataKey="value"
                                            stroke={elementColor}
                                            fill={elementColor}
                                            fillOpacity={0.6}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Digital Pujeok */}
                        <div className="w-32">
                            <Talisman element={element} />
                        </div>

                        {/* User Info */}
                        <div className="text-center">
                            <p className="text-white font-bold text-xl mb-1">{name}</p>
                            <p className="text-zinc-400 text-sm font-mono">{birthDate}</p>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                            <p className="text-zinc-500 text-xs uppercase tracking-wider">
                                Unlock Full 2026 Report
                            </p>
                            <p className="text-red-500 text-xs mt-1">www.soulfile.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={downloadCard}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider transition-all border-2 border-red-500 flex items-center justify-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Download Soul Card
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={shareCard}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider transition-all border-2 border-zinc-600 flex items-center justify-center gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    Share
                </motion.button>
            </div>

            <p className="text-zinc-500 text-xs text-center">
                📸 Share your Soul Card on Instagram/TikTok to unlock viral growth!
            </p>
        </div>
    );
}
