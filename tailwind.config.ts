import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                // Saja Theme Colors
                saja: {
                    black: "#000000",
                    red: "#dc2626", // red-600
                    metal: "#27272a", // zinc-800
                    glow: "#ef4444", // red-500 for glows
                },
            },
            fontFamily: {
                mono: ["var(--font-mono)", "Courier New", "monospace"],
                sans: ["var(--font-geist-sans)", "sans-serif"],
            },
            animation: {
                "glitch": "glitch 1s linear infinite",
                "scan": "scan 2s ease-in-out infinite",
                "pulse-red": "pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                glitch: {
                    "0%, 100%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(-2px, -2px)" },
                    "60%": { transform: "translate(2px, 2px)" },
                    "80%": { transform: "translate(2px, -2px)" },
                },
                scan: {
                    "0%, 100%": { transform: "translateY(-100%)", opacity: "0" },
                    "50%": { transform: "translateY(100%)", opacity: "1" },
                },
                "pulse-red": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
