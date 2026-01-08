"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Download, Share2, ArrowRight } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Valued Customer";
    const element = searchParams.get("element") || "unknown";

    return (
        <main className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden flex items-center justify-center">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-600/20 border-2 border-green-600">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4"
                        style={{
                            textShadow: `
                  0 0 10px rgba(220, 38, 38, 0.8),
                  0 0 20px rgba(220, 38, 38, 0.4)
                `
                        }}>
                        Payment Successful!
                    </h1>
                    <p className="text-zinc-400 text-lg mb-8">
                        Thank you for unlocking your complete soul report, {name}.
                    </p>
                </motion.div>

                {/* What's Next */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-900/50 border border-zinc-800 p-8 mb-8"
                >
                    <h2 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wider">
                        What's Next?
                    </h2>

                    <div className="space-y-4 text-left">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-red-500 font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Check Your Email</h3>
                                <p className="text-zinc-400 text-sm">
                                    Your complete 2026 soul report has been sent to your email address.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-red-500 font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Download Your Digital Pujeok</h3>
                                <p className="text-zinc-400 text-sm mb-3">
                                    High-resolution protective talisman customized for your {element.toUpperCase()} element.
                                </p>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download Pujeok
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-red-500 font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Share Your Soul Card</h3>
                                <p className="text-zinc-400 text-sm mb-3">
                                    Help your friends discover their soul identity too!
                                </p>
                                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share on Social
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-base font-bold uppercase tracking-wider transition-all"
                    >
                        Get Another Reading
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

                {/* Footer */}
                <p className="text-zinc-600 text-xs mt-8">
                    Need help? Contact us at support@saja-archives.com
                </p>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center text-red-600">
                Loading...
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
