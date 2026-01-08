import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-zinc-900 pt-8 pb-6">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Links */}
                    <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                        <Link
                            href="/terms"
                            className="text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <span className="text-zinc-700">|</span>
                        <Link
                            href="/privacy"
                            className="text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-zinc-700">|</span>
                        <a
                            href="mailto:contact@soulfile.xyz"
                            className="text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-zinc-600 text-xs uppercase tracking-wider">
                            © 2026 SOULFILE SYSTEM
                        </p>
                        <p className="text-zinc-700 text-[10px] mt-1">
                            Encrypted by The Archivist
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
