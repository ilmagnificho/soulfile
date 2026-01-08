"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE_CHARS = ["화", "수", "목", "금", "토", "✶", "★", "▲", "█", "▓", "░"];

const PROCESS_STEPS = [
    { id: 1, label: "Accessing Netherworld Database", icon: "🌐" },
    { id: 2, label: "Calculating Elemental Affinity", icon: "🔮" },
    { id: 3, label: "Analyzing Karmic Patterns", icon: "⚖️" },
    { id: 4, label: "Generating Soul Report", icon: "📜" },
];

export default function HackingLoader() {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 15;
            });
        }, 200);

        // Step progression (every 750ms)
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => Math.min(prev + 1, PROCESS_STEPS.length));
        }, 750);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, []);

    // Generate Matrix rain columns
    const matrixColumns = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        chars: Array.from({ length: 15 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]),
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] w-full h-[100dvh] flex items-center justify-center overflow-hidden px-4 py-8"
            style={{
                backgroundColor: '#000000',
                opacity: 1,
            }}
        >
            {/* Matrix Code Rain Background */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {matrixColumns.map((col) => (
                    <motion.div
                        key={col.id}
                        className="absolute top-0 flex flex-col text-red-500 font-mono text-xs sm:text-sm"
                        style={{
                            left: `${(col.id / 30) * 100}%`,
                            willChange: "transform",
                        }}
                        animate={{
                            y: ["0%", "100vh"],
                        }}
                        transition={{
                            duration: col.duration,
                            delay: col.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {col.chars.map((char, i) => (
                            <span key={i} className="opacity-70">
                                {char}
                            </span>
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Main Content - Absolutely Centered */}
            <div className="w-full max-w-2xl px-4 sm:px-6 relative z-10 flex flex-col items-center overflow-y-auto max-h-full py-4">
                {/* Process Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-red-500 text-2xl sm:text-4xl font-bold uppercase tracking-wider mb-2"
                        style={{
                            textShadow: `
                0 0 10px rgba(220, 38, 38, 0.8),
                0 0 20px rgba(220, 38, 38, 0.5)
              `
                        }}
                    >
                        Analyzing Your Soul Data
                    </motion.div>
                    <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider">
                        Please wait while we access the archives...
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="w-full max-w-md mb-8">
                    <div className="space-y-3">
                        {PROCESS_STEPS.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: currentStep >= index ? 1 : 0.3,
                                    x: 0
                                }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center gap-3 p-3 border ${currentStep >= index
                                    ? 'border-red-600 bg-red-950/20'
                                    : 'border-zinc-800 bg-zinc-950/20'
                                    }`}
                            >
                                <span className="text-2xl">{step.icon}</span>
                                <div className="flex-1">
                                    <p className={`text-sm font-mono ${currentStep >= index ? 'text-red-500' : 'text-zinc-600'
                                        }`}>
                                        {step.label}
                                    </p>
                                </div>
                                {currentStep > index && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-green-500 text-xl"
                                    >
                                        ✓
                                    </motion.span>
                                )}
                                {currentStep === index && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="text-red-500 text-xl"
                                    >
                                        ⟳
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm text-zinc-400 uppercase tracking-wider">
                        <span>Decryption Progress</span>
                        <span className="text-red-500 font-bold">{Math.min(100, Math.floor(progress))}%</span>
                    </div>
                    <div className="h-4 sm:h-6 bg-zinc-900 border-2 border-red-900 overflow-hidden relative"
                        style={{
                            boxShadow: `inset 0 0 20px rgba(0, 0, 0, 0.8)`
                        }}>
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 relative"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(100, progress)}%` }}
                            transition={{ duration: 0.3 }}
                            style={{
                                boxShadow: `
                  0 0 20px rgba(220, 38, 38, 0.8),
                  0 0 40px rgba(220, 38, 38, 0.5)
                `,
                                willChange: "width",
                            }}
                        >
                            {/* Animated shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Warning */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex items-center justify-center gap-2"
                >
                    <motion.div
                        className="w-3 h-3 bg-red-600 rounded-full"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                            boxShadow: `0 0 10px rgba(220, 38, 38, 0.8)`
                        }}
                    />
                    <span className="text-red-500 text-xs sm:text-sm uppercase tracking-wider font-bold">
                        DO NOT CLOSE THIS WINDOW
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}
