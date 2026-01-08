"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import HackingLoader from "./HackingLoader";

export default function SoulScanner() {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [showHackingLoader, setShowHackingLoader] = useState(false);
    const router = useRouter();

    // Placeholder for glitch sound effect
    const playGlitchSound = () => {
        // TODO: Implement sound effect
        // Example: new Audio('/sounds/glitch.mp3').play();
        console.log("🔊 Glitch sound would play here");
    };

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !birthDate) return;

        setIsScanning(true);
        setShowHackingLoader(true);

        // Show hacking loader for 3 seconds before navigating
        setTimeout(() => {
            const params = new URLSearchParams({
                name,
                birthDate,
            });
            router.push(`/report?${params.toString()}`);
        }, 3000);
    };

    return (
        <>
            <AnimatePresence>
                {showHackingLoader && <HackingLoader />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative w-full max-w-2xl mx-auto"
            >
                {/* Scanning overlay effect */}
                {isScanning && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/20 to-transparent"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ zIndex: 10 }}
                    />
                )}

                <div className="border border-zinc-800 bg-black/90 p-8 relative overflow-hidden">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />

                    <form onSubmit={handleScan} className="space-y-6">
                        {/* Status indicator */}
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <motion.div
                                className="w-2 h-2 bg-red-600 rounded-full"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span>SYSTEM ACTIVE</span>
                        </div>

                        {/* Name field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-zinc-400 text-sm uppercase tracking-wider">
                                Subject Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-zinc-800 px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors font-mono"
                                placeholder="Enter your full name"
                                disabled={isScanning}
                                required
                            />
                        </div>

                        {/* Birth date field */}
                        <div className="space-y-2">
                            <label htmlFor="birthDate" className="block text-zinc-400 text-sm uppercase tracking-wider">
                                Birth Data
                            </label>
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full bg-black border border-zinc-800 px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors font-mono"
                                disabled={isScanning}
                                required
                            />
                        </div>

                        {/* Scan button */}
                        <motion.button
                            type="submit"
                            disabled={isScanning}
                            onMouseEnter={playGlitchSound}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white py-4 px-6 font-bold uppercase tracking-wider transition-all border border-red-500 disabled:border-zinc-700 relative overflow-hidden group"
                        >
                            {isScanning ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        ⟳
                                    </motion.span>
                                    INITIALIZING...
                                </span>
                            ) : (
                                <>
                                    <span className="relative z-10">⚡ SCAN SOUL ⚡</span>
                                    <motion.div
                                        className="absolute inset-0 bg-red-500"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </>
                            )}
                        </motion.button>

                        {/* Warning text */}
                        <p className="text-zinc-500 text-xs text-center">
                            ⚠️ WARNING: This process will access your soul data from the Netherworld Database
                        </p>
                    </form>
                </div>
            </motion.div>
        </>
    );
}
