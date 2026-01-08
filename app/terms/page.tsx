import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors text-xs uppercase tracking-wider mb-8"
                >
                    <span>←</span> Return to Terminal
                </Link>

                <div className="border-4 border-red-600/30 p-6 sm:p-8 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-red-500 uppercase tracking-wider">
                        Terms of Service
                    </h1>
                    <p className="text-zinc-500 text-sm">Last Updated: January 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-zinc max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">1. Entertainment Purposes Only</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            This SOULFILE System analysis is provided for <strong className="text-white">ENTERTAINMENT PURPOSES ONLY</strong>.
                            The results are based on traditional Korean cosmology (Eum-Yang & O-Haeng) and should not be used for:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>Medical, legal, or financial decisions</li>
                            <li>Professional advice of any kind</li>
                            <li>Life-changing decisions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">2. No Guarantees</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            The Archivist and The Service Provider make no guarantees about accuracy or outcomes.
                            All analysis is generated based on algorithmic interpretation of traditional cosmological principles
                            and should be viewed as a novelty service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">3. User Acknowledgment</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            By proceeding, you acknowledge that:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>This is a novelty entertainment service</li>
                            <li>Results are not scientifically validated</li>
                            <li>You will not make important decisions based solely on this analysis</li>
                            <li>You understand the cultural and traditional basis of the system</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">4. Intellectual Property</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            The SOULFILE System, including all design elements, analysis algorithms, and branding,
                            is proprietary. You may download and share your personal Soul Card for personal use,
                            but may not reproduce or commercialize the system.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">5. Limitation of Liability</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Under no circumstances shall SOULFILE SYSTEM, The Archivist, or The Service Provider
                            be liable for any direct, indirect, incidental, special, consequential, or punitive
                            damages arising from your use of this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">6. Changes to Terms</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We reserve the right to modify these terms at any time. Continued use of the service
                            constitutes acceptance of updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-red-400 uppercase mb-4">7. Contact</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            For questions about these terms, contact: <a href="mailto:info@tetracorp.co.kr" className="text-red-500 hover:text-red-400">info@tetracorp.co.kr</a>
                        </p>
                    </section>
                </div>

                {/* Footer Link */}
                <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
                    <Link
                        href="/"
                        className="text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider text-sm"
                    >
                        ← Back to Terminal
                    </Link>
                </div>
            </div>
        </main>
    );
}
