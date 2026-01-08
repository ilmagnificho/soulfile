"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import HackingLoader from "./HackingLoader";
import DisclaimerModal from "./DisclaimerModal";

export default function FortuneForm() {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [showHackingLoader, setShowHackingLoader] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
    const router = useRouter();

    // Check localStorage on mount - DISABLED FOR TESTING
    useEffect(() => {
        // const accepted = localStorage.getItem("saja_disclaimer_accepted");
        // if (accepted === "true") {
        //     setHasAcceptedDisclaimer(true);
        // }
        // ALWAYS SHOW MODAL FOR TESTING
        setHasAcceptedDisclaimer(false);
    }, []);

    // Refs for auto-focus
    const monthRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLInputElement>(null);

    // Placeholder for glitch sound effect
    const playGlitchSound = () => {
        // TODO: Implement sound effect
        // Example: new Audio('/sounds/glitch.mp3').play();
        console.log("🔊 Glitch sound would play here");
    };

    // Handle year input (4 digits, auto-focus to month)
    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Only digits
        if (value.length <= 4) {
            setYear(value);
            // Auto-focus to month when 4 digits entered
            if (value.length === 4 && monthRef.current) {
                monthRef.current.focus();
            }
        }
    };

    // Handle month input (2 digits, 01-12)
    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 2) {
            const monthNum = parseInt(value);
            if (value === "" || (monthNum >= 1 && monthNum <= 12)) {
                setMonth(value);
                // Auto-focus to day when 2 digits entered
                if (value.length === 2 && dayRef.current) {
                    dayRef.current.focus();
                }
            }
        }
    };

    // Handle day input (2 digits, 01-31)
    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 2) {
            const dayNum = parseInt(value);
            if (value === "" || (dayNum >= 1 && dayNum <= 31)) {
                setDay(value);
            }
        }
    };

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !year || !month || !day) return;

        // Show disclaimer if not already accepted
        if (!hasAcceptedDisclaimer) {
            setShowDisclaimer(true);
            return;
        }

        // Start scanning process
        startScanning();
    };

    const handleDisclaimerAccept = () => {
        localStorage.setItem("saja_disclaimer_accepted", "true");
        setHasAcceptedDisclaimer(true);
        setShowDisclaimer(false);
        startScanning();
    };

    const handleDisclaimerCancel = () => {
        setShowDisclaimer(false);
    };

    const startScanning = () => {
        // Pad month and day with leading zeros if needed
        const paddedMonth = month.padStart(2, "0");
        const paddedDay = day.padStart(2, "0");
        const birthDate = `${year}-${paddedMonth}-${paddedDay}`;

        setIsScanning(true);
        setShowHackingLoader(true);

        // Show hacking loader for 3 seconds before navigating
        setTimeout(() => {
            const params = new URLSearchParams({
                name,
                birthDate,
                time: "00:00",
            });
            router.push(`/report?${params.toString()}`);
        }, 3000);
    };

    return (
        <>
            <AnimatePresence>
                {showHackingLoader && <HackingLoader />}
            </AnimatePresence>

            <DisclaimerModal
                isOpen={showDisclaimer}
                onAccept={handleDisclaimerAccept}
                onCancel={handleDisclaimerCancel}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative w-full max-w-2xl mx-auto px-4"
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

                <div className="border-2 border-red-600/70 bg-black/90 p-4 sm:p-8 relative overflow-hidden"
                    style={{
                        boxShadow: `
                         0 0 20px rgba(220, 38, 38, 0.4),
                         0 0 40px rgba(220, 38, 38, 0.2),
                         inset 0 0 30px rgba(220, 38, 38, 0.1)
                       `
                    }}>
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500" />

                    <form onSubmit={handleScan} className="space-y-6">
                        {/* Status indicator */}
                        <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm">
                            <motion.div
                                className="w-2 h-2 bg-red-600 rounded-full"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span>SYSTEM ACTIVE</span>
                        </div>

                        {/* Name field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-zinc-400 text-xs sm:text-sm uppercase tracking-wider">
                                Subject Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-red-600 focus:outline-none transition-colors font-mono"
                                placeholder="Enter your full name"
                                disabled={isScanning}
                                required
                            />
                        </div>

                        {/* Birth Date Fields */}
                        <div className="space-y-2">
                            <label className="block text-zinc-400 text-xs sm:text-sm uppercase tracking-wider">
                                Birth Date
                            </label>
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                {/* Year */}
                                <div>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={year}
                                        onChange={handleYearChange}
                                        className="w-full bg-black border border-zinc-800 px-2 sm:px-3 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-red-600 focus:outline-none transition-colors font-mono text-center"
                                        placeholder="YYYY"
                                        disabled={isScanning}
                                        maxLength={4}
                                        required
                                    />
                                    <p className="text-zinc-600 text-xs mt-1 text-center">Year</p>
                                </div>

                                {/* Month */}
                                <div>
                                    <input
                                        ref={monthRef}
                                        type="text"
                                        inputMode="numeric"
                                        value={month}
                                        onChange={handleMonthChange}
                                        className="w-full bg-black border border-zinc-800 px-2 sm:px-3 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-red-600 focus:outline-none transition-colors font-mono text-center"
                                        placeholder="MM"
                                        disabled={isScanning}
                                        maxLength={2}
                                        required
                                    />
                                    <p className="text-zinc-600 text-xs mt-1 text-center">Month</p>
                                </div>

                                {/* Day */}
                                <div>
                                    <input
                                        ref={dayRef}
                                        type="text"
                                        inputMode="numeric"
                                        value={day}
                                        onChange={handleDayChange}
                                        className="w-full bg-black border border-zinc-800 px-2 sm:px-3 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-red-600 focus:outline-none transition-colors font-mono text-center"
                                        placeholder="DD"
                                        disabled={isScanning}
                                        maxLength={2}
                                        required
                                    />
                                    <p className="text-zinc-600 text-xs mt-1 text-center">Day</p>
                                </div>
                            </div>
                        </div>

                        {/* Scan button */}
                        <motion.button
                            type="submit"
                            disabled={isScanning}
                            onMouseEnter={playGlitchSound}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.4)",
                                    "0 0 40px rgba(220, 38, 38, 1), 0 0 80px rgba(220, 38, 38, 0.6), 0 0 120px rgba(220, 38, 38, 0.3)",
                                    "0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.4)",
                                ]
                            }}
                            transition={{
                                boxShadow: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white py-4 sm:py-5 px-6 text-base sm:text-lg font-bold uppercase tracking-wider transition-all border-2 border-red-500 disabled:border-zinc-700 relative overflow-hidden group"
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
