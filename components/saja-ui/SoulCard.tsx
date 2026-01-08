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

const elementStyles: Record<string, {
    accent: string;
    bgGradient: string;
    seal: string;
    symbol: string;
}> = {
    fire: {
        accent: "#FF6B35",
        bgGradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1010 50%, #1a0808 100%)",
        seal: "화",
        symbol: "🔥"
    },
    water: {
        accent: "#00D4FF",
        bgGradient: "linear-gradient(135deg, #0a1a1f 0%, #0d2535 50%, #081520 100%)",
        seal: "수",
        symbol: "🌊"
    },
    wood: {
        accent: "#4ADE80",
        bgGradient: "linear-gradient(135deg, #0a1a10 0%, #102d15 50%, #081a0d 100%)",
        seal: "목",
        symbol: "🌲"
    },
    metal: {
        accent: "#C0C0C0",
        bgGradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #151515 100%)",
        seal: "금",
        symbol: "⚔️"
    },
    earth: {
        accent: "#FBBF24",
        bgGradient: "linear-gradient(135deg, #1a1508 0%, #2d2210 50%, #1a1505 100%)",
        seal: "토",
        symbol: "⛰️"
    },
};

export default function SoulCard({ name, birthDate, element }: SoulCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const style = elementStyles[element] || elementStyles.earth;
    const birthYear = birthDate.split('-')[0] || '????';

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            {/* Soul Card - Instagram-Ready Square */}
            <div
                ref={cardRef}
                style={{
                    width: '340px',
                    height: '340px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: style.bgGradient,
                    boxShadow: `0 25px 60px -15px ${style.accent}40, 0 0 0 1px rgba(255,255,255,0.08)`,
                }}
            >
                {/* Grid pattern overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    pointerEvents: 'none',
                }} />

                {/* Top accent line */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)`,
                }} />

                {/* Header Row */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                    <div>
                        <p style={{ fontSize: '10px', color: '#71717a', letterSpacing: '0.2em', margin: 0 }}>SOULFILE</p>
                        <p style={{ fontSize: '8px', color: '#52525b', letterSpacing: '0.1em', margin: '2px 0 0 0' }}>K-ORACLE™</p>
                    </div>
                    <div style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        background: `${style.accent}20`,
                        color: style.accent,
                        border: `1px solid ${style.accent}50`,
                    }}>
                        2026
                    </div>
                </div>

                {/* Center - Element Display */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    {/* Large Symbol */}
                    <div style={{
                        fontSize: '72px',
                        marginBottom: '8px',
                        filter: `drop-shadow(0 0 30px ${style.accent}80)`,
                    }}>
                        {style.symbol}
                    </div>

                    {/* Seal Circle */}
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        border: `2px solid ${style.accent}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        background: `radial-gradient(circle, ${style.accent}25, transparent)`,
                        boxShadow: `0 0 30px ${style.accent}50`,
                    }}>
                        <span style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: style.accent,
                            textShadow: `0 0 15px ${style.accent}`,
                        }}>
                            {style.seal}
                        </span>
                    </div>

                    {/* Element Name */}
                    <p style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: style.accent,
                        margin: 0,
                    }}>
                        {element}
                    </p>
                    <p style={{
                        fontSize: '9px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#71717a',
                        margin: '4px 0 0 0',
                    }}>
                        ELEMENT
                    </p>
                </div>

                {/* Bottom - Subject Info */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                }}>
                    {/* Divider */}
                    <div style={{ height: '1px', background: '#3f3f46', marginBottom: '12px' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <p style={{ fontSize: '8px', color: '#52525b', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>SUBJECT</p>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                color: 'white',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                margin: 0,
                            }}>
                                {name}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '8px', color: '#52525b', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>ID</p>
                            <p style={{
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                color: '#a1a1aa',
                                margin: 0,
                            }}>
                                {cardId}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button
                    onClick={shareCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        borderRadius: '24px',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: `${style.accent}20`,
                        color: style.accent,
                        border: `1px solid ${style.accent}50`,
                        cursor: 'pointer',
                    }}
                >
                    <Share2 style={{ width: '14px', height: '14px' }} />
                    Share
                </motion.button>
                <motion.button
                    onClick={downloadCard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        borderRadius: '24px',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: '#18181b',
                        color: '#a1a1aa',
                        border: '1px solid #3f3f46',
                        cursor: 'pointer',
                    }}
                >
                    <Download style={{ width: '14px', height: '14px' }} />
                    Save
                </motion.button>
            </div>
        </div>
    );
}
