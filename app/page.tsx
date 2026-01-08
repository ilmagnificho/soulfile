"use client";

import { motion } from "framer-motion";
import FortuneForm from "@/components/saja-ui/FortuneForm";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-black relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Red glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <div className="inline-block border border-red-600 px-6 py-2 mb-4">
              <span className="text-red-600 text-sm uppercase tracking-[0.3em] font-bold">
                CLASSIFIED
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-6xl md:text-8xl font-bold mb-4 text-white"
            style={{
              textShadow: `
                0 0 10px rgba(220, 38, 38, 1),
                0 0 20px rgba(220, 38, 38, 0.9),
                0 0 30px rgba(220, 38, 38, 0.7),
                0 0 40px rgba(220, 38, 38, 0.5),
                0 0 70px rgba(220, 38, 38, 0.3),
                0 0 100px rgba(147, 51, 234, 0.2)
              `
            }}
          >
            SOULFILE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mx-auto space-y-2"
          >
            <p className="text-red-500 text-xl md:text-3xl uppercase tracking-wider font-bold"
              style={{
                textShadow: `
                   0 0 10px rgba(220, 38, 38, 0.8),
                   0 0 20px rgba(220, 38, 38, 0.4)
                 `
              }}
            >
              YOUR DESTINY, DECRYPTED.
            </p>
            <p className="text-zinc-400 text-sm md:text-base">
              Identity Verification Required. Enter your birth data to retrieve your fate file.
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-600" />
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse-red" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-600" />
          </motion.div>
        </div>

        {/* Fortune Form Component */}
        <FortuneForm />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 sm:mt-12 text-center px-4"
        >
          <p className="text-zinc-600 text-xs sm:text-sm uppercase tracking-wider">
            Managed by the Saja Boys // Modern Korean Grim Reapers
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-zinc-700">
            <span className="text-xs">⚡</span>
            <span className="text-xs sm:text-sm font-mono">CYBER-SHAMANISM</span>
            <span className="text-xs">⚡</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
