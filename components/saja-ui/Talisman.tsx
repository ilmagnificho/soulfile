"use client";

import { motion } from "framer-motion";

interface TalismanProps {
    element: "fire" | "water" | "wood" | "metal" | "earth";
}

const elementData = {
    fire: { char: "화", color: "#DC2626", secondaryColor: "#EF4444" },
    water: { char: "수", color: "#2563EB", secondaryColor: "#3B82F6" },
    wood: { char: "목", color: "#16A34A", secondaryColor: "#22C55E" },
    metal: { char: "금", color: "#A1A1AA", secondaryColor: "#D4D4D8" },
    earth: { char: "토", color: "#D97706", secondaryColor: "#F59E0B" },
};

export default function Talisman({ element }: TalismanProps) {
    const data = elementData[element];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[200px] mx-auto"
        >
            <svg
                viewBox="0 0 200 400"
                className="w-full h-auto drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Red paper texture gradient */}
                    <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7F1D1D" />
                        <stop offset="50%" stopColor="#991B1B" />
                        <stop offset="100%" stopColor="#7F1D1D" />
                    </linearGradient>

                    {/* Aged paper texture */}
                    <filter id="paperTexture">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                        <feColorMatrix type="saturate" values="0.1" />
                        <feBlend mode="multiply" in="SourceGraphic" />
                    </filter>

                    {/* Glow filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Paper background */}
                <rect
                    width="200"
                    height="400"
                    fill="url(#paperGradient)"
                    filter="url(#paperTexture)"
                />

                {/* Decorative border */}
                <rect
                    x="10"
                    y="10"
                    width="180"
                    height="380"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                />

                {/* Inner decorative frame */}
                <rect
                    x="20"
                    y="20"
                    width="160"
                    height="360"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1"
                />

                {/* Yin-Yang symbol at top */}
                <g transform="translate(100, 60)">
                    <circle r="25" fill="#1C1917" />
                    <path
                        d="M 0,-25 A 25,25 0 0,1 0,25 A 12.5,12.5 0 0,1 0,0 A 12.5,12.5 0 0,0 0,-25"
                        fill="#F5F5F4"
                    />
                    <circle cy="-12.5" r="3" fill="#1C1917" />
                    <circle cy="12.5" r="3" fill="#F5F5F4" />
                </g>

                {/* Main element character */}
                <text
                    x="100"
                    y="220"
                    fontSize="120"
                    fontFamily="'Noto Serif SC', 'Ma Shan Zheng', serif"
                    fontWeight="900"
                    textAnchor="middle"
                    fill="#1C1917"
                    stroke={data.color}
                    strokeWidth="1"
                    filter="url(#glow)"
                    style={{
                        paintOrder: "stroke fill",
                    }}
                >
                    {data.char}
                </text>

                {/* Element name in Korean traditional style */}
                <text
                    x="100"
                    y="280"
                    fontSize="16"
                    fontFamily="'Noto Serif SC', serif"
                    fontWeight="500"
                    textAnchor="middle"
                    fill="#D4AF37"
                    letterSpacing="3"
                >
                    {element.toUpperCase()}
                </text>

                {/* Decorative bottom pattern */}
                <g transform="translate(100, 320)">
                    <path
                        d="M -30,0 L -20,-10 L -10,0 L 0,-10 L 10,0 L 20,-10 L 30,0"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        fill="none"
                    />
                </g>

                {/* Seal stamp at bottom */}
                <g transform="translate(100, 360)">
                    <circle r="20" fill="#B91C1C" opacity="0.9" />
                    <text
                        fontSize="18"
                        fontFamily="'Noto Serif SC', serif"
                        fontWeight="700"
                        textAnchor="middle"
                        dy="7"
                        fill="#FEE2E2"
                    >
                        使
                    </text>
                </g>

                {/* Corner embellishments */}
                <circle cx="30" cy="30" r="3" fill="#D4AF37" opacity="0.6" />
                <circle cx="170" cy="30" r="3" fill="#D4AF37" opacity="0.6" />
                <circle cx="30" cy="370" r="3" fill="#D4AF37" opacity="0.6" />
                <circle cx="170" cy="370" r="3" fill="#D4AF37" opacity="0.6" />
            </svg>
        </motion.div>
    );
}
