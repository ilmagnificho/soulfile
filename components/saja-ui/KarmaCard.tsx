"use client";

import { motion } from "framer-motion";

interface KarmaCardProps {
    name: string;
    element: string;
    birthDate: string;
    elementColor: string;
    elementEmoji: string;
}

export default function KarmaCard({
    name,
    element,
    birthDate,
    elementColor,
    elementEmoji
}: KarmaCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-3xl mx-auto"
        >
            {/* Holographic effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-purple-600/10 pointer-events-none" />

            <div className="border-2 border-zinc-800 bg-black/95 p-8 md:p-12 relative">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600" />

                {/* Header */}
                <div className="border-b border-zinc-800 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                                NETHERWORLD DATABASE // SOUL FILE
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold text-red-600">
                                SUBJECT IDENTIFIED
                            </h2>
                        </div>
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl"
                        >
                            {elementEmoji}
                        </motion.div>
                    </div>
                </div>

                {/* Data fields */}
                <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                        <span className="text-zinc-500 text-sm uppercase">Name:</span>
                        <span className="text-white text-lg font-bold tracking-wide">{name}</span>
                    </div>

                    <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                        <span className="text-zinc-500 text-sm uppercase">Birth Date:</span>
                        <span className="text-white text-lg font-mono">{birthDate}</span>
                    </div>

                    <div className="grid grid-cols-[140px_1fr] gap-4 items-center border-t border-zinc-800 pt-4">
                        <span className="text-zinc-500 text-sm uppercase">Element:</span>
                        <span className={`text-2xl font-bold ${elementColor}`}>
                            {element.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Status bar */}
                <div className="border border-zinc-800 bg-black p-4">
                    <div className="flex items-center gap-2">
                        <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-green-500 text-xs uppercase tracking-wider">
                            DATA RETRIEVAL COMPLETE
                        </span>
                    </div>
                </div>

                {/* Timestamp */}
                <div className="mt-4 text-right">
                    <p className="text-zinc-600 text-xs font-mono">
                        TIMESTAMP: {new Date().toISOString()}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
