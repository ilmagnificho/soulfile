"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DisclaimerModalProps {
    isOpen: boolean;
    onAccept: () => void;
    onCancel: () => void;
}

export default function DisclaimerModal({ isOpen, onAccept, onCancel }: DisclaimerModalProps) {
    const [isAccepting, setIsAccepting] = useState(false);

    const handleAccept = () => {
        setIsAccepting(true);
        setTimeout(() => {
            onAccept();
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] w-screen h-screen flex items-center justify-center p-4"
                    style={{
                        backgroundColor: '#000000',
                        opacity: 1,
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-black border-2 border-red-600/70 max-w-lg w-full max-h-[85vh] flex flex-col relative"
                        style={{
                            boxShadow: `
                0 0 30px rgba(220, 38, 38, 0.5),
                0 0 60px rgba(220, 38, 38, 0.3),
                inset 0 0 50px rgba(220, 38, 38, 0.1)
              `
                        }}
                    >
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500" />

                        {/* Header */}
                        <div className="bg-red-950/50 border-b-2 border-red-600/50 p-6">
                            <motion.div
                                animate={{ opacity: [1, 0.7, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-center"
                            >
                                <div className="inline-block border border-red-600 px-4 py-2 mb-3">
                                    <span className="text-red-500 text-xs uppercase tracking-[0.3em] font-bold">
                                        CLASSIFIED
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-red-500 uppercase tracking-wider"
                                    style={{
                                        textShadow: `
                        0 0 10px rgba(220, 38, 38, 0.8),
                        0 0 20px rgba(220, 38, 38, 0.4)
                      `
                                    }}>
                                    Soul Access Agreement
                                </h2>
                            </motion.div>
                        </div>

                        {/* Content - Scrollable */}
                        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                            <div className="bg-zinc-950/50 border border-red-900/30 p-4 rounded">
                                <div className="flex items-start gap-3 mb-4">
                                    <span className="text-3xl">⚠️</span>
                                    <div>
                                        <h3 className="text-red-500 font-bold uppercase text-sm mb-2">
                                            Important Notice
                                        </h3>
                                        <p className="text-zinc-400 text-xs leading-relaxed">
                                            This Saja Soul Analysis is provided for <strong className="text-white">ENTERTAINMENT PURPOSES ONLY</strong>.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-zinc-500 text-xs leading-relaxed">
                                    <p>
                                        The results are based on traditional Korean cosmology (Yin-Yang Five Elements Theory)
                                        and should not be used for:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                        <li>Medical, legal, or financial decisions</li>
                                        <li>Professional advice of any kind</li>
                                        <li>Life-changing decisions</li>
                                    </ul>
                                    <p className="pt-2">
                                        The Saja Boys and Tetra Corporation make no guarantees about accuracy or outcomes.
                                    </p>
                                    <p className="text-red-500/70 pt-2">
                                        By proceeding, you acknowledge this is a novelty entertainment service.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons - Sticky at bottom */}
                        <div className="p-6 sm:p-8 pt-0 border-t border-red-900/30 bg-black">
                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onCancel}
                                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 py-3 px-6 text-sm uppercase tracking-wider transition-all"
                                >
                                    ✗ Cancel
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAccept}
                                    disabled={isAccepting}
                                    animate={{
                                        boxShadow: isAccepting ? [] : [
                                            "0 0 20px rgba(139, 0, 0, 0.6)",
                                            "0 0 40px rgba(139, 0, 0, 0.8)",
                                            "0 0 20px rgba(139, 0, 0, 0.6)",
                                        ]
                                    }}
                                    transition={{
                                        boxShadow: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className="flex-1 bg-red-900 hover:bg-red-800 border-2 border-red-700 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                    {isAccepting ? "SEALING..." : "🩸 SEAL THE CONTRACT"}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
