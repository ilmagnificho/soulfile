import Link from "next/link";

export default function PrivacyPage() {
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

                <div className="border-4 border-purple-600/30 p-6 sm:p-8 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-purple-500 uppercase tracking-wider">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-500 text-sm">Last Updated: January 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-zinc max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">1. Data We Collect</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            When you use SOULFILE SYSTEM, we collect only the following information:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li><strong className="text-white">Name:</strong> For personalization of your Soul Card</li>
                            <li><strong className="text-white">Birth Date:</strong> For elemental analysis calculation</li>
                            <li><strong className="text-white">Session Data:</strong> Temporary data during your browsing session</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">2. How We Use Your Data</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Your data is used exclusively to:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>Generate your personalized soul analysis</li>
                            <li>Create your downloadable/shareable Soul Card</li>
                            <li>Provide the SOULFILE experience</li>
                        </ul>
                        <p className="text-zinc-300 leading-relaxed mt-4">
                            <strong className="text-yellow-500">We do NOT store your personal data permanently.</strong> All analysis
                            is performed in real-time and session-based.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">3. Data Storage</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            SOULFILE SYSTEM operates on a <strong className="text-white">session-only basis</strong>. This means:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>Your name and birth date are only stored temporarily in your browser session</li>
                            <li>We do not maintain a database of user information</li>
                            <li>Once you close your browser, your information is gone</li>
                            <li>We cannot retrieve your analysis after your session ends</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">4. Third-Party Services</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We may use third-party services for:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li><strong className="text-white">Hosting:</strong> Vercel (see their privacy policy)</li>
                            <li><strong className="text-white">Payment Processing (if applicable):</strong> Lemon Squeezy (see their privacy policy)</li>
                            <li><strong className="text-white">Analytics (optional):</strong> For understanding usage patterns (anonymized)</li>
                        </ul>
                        <p className="text-zinc-300 leading-relaxed mt-4">
                            We do not share your personal data with third parties for marketing purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">5. Cookies</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We use minimal cookies only for:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>Maintaining your session state</li>
                            <li>Remembering your disclaimer acceptance</li>
                        </ul>
                        <p className="text-zinc-300 leading-relaxed mt-4">
                            No tracking cookies or advertising cookies are used.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">6. Your Rights</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Since we do not permanently store your data, there is no stored data to:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>Request for deletion (it's already not stored)</li>
                            <li>Request for access (we don't have it)</li>
                            <li>Request for portability (session-only data)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">7. Security</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We implement reasonable security measures including:
                        </p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-2 ml-4">
                            <li>HTTPS encryption for all connections</li>
                            <li>Secure hosting infrastructure</li>
                            <li>No permanent data storage (inherently secure)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase  mb-4">8. Changes to This Policy</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We may update this privacy policy from time to time. Significant changes will be noted
                            with an updated "Last Updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-purple-400 uppercase mb-4">9. Contact Us</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            For privacy-related questions or concerns, contact: <a href="mailto:contact@soulfile.xyz" className="text-purple-500 hover:text-purple-400">contact@soulfile.xyz</a>
                        </p>
                    </section>
                </div>

                {/* Footer Link */}
                <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
                    <Link
                        href="/"
                        className="text-purple-500 hover:text-purple-400 transition-colors uppercase tracking-wider text-sm"
                    >
                        ← Back to Terminal
                    </Link>
                </div>
            </div>
        </main>
    );
}
