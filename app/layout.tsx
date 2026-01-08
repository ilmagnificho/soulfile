import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SOULFILE | Your Destiny, Decrypted",
  description: "Analyze your soul based on traditional Korean Eum-Yang & O-Haeng cosmology. Cyber-shamanism access terminal.",
  keywords: ["Soul Analysis", "Korean Shamanism", "Saju", "Fortune Telling", "Cyberpunk", "Eum-Yang", "O-Haeng", "Five Elements", "Destiny"],

  openGraph: {
    title: "SOULFILE | Your Destiny, Decrypted",
    description: "Analyze your soul based on traditional Korean Eum-Yang & O-Haeng cosmology.",
    url: "https://www.soulfile.xyz",
    siteName: "SOULFILE",
    type: "website",
    images: [{
      url: "https://www.soulfile.xyz/og-image.png",
      width: 1200,
      height: 630,
      alt: "SOULFILE - Your Destiny, Decrypted",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOULFILE | Your Destiny, Decrypted",
    description: "Analyze your soul based on traditional Korean Eum-Yang & O-Haeng cosmology.",
    images: ["https://www.soulfile.xyz/og-image.png"],
  },
  other: {
    "ICBM": "37.5665, 126.9780",
    "geo.position": "37.5665;126.9780",
    "geo.placename": "Seoul",
    "geo.region": "KR-11",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EL8NK0QZZK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EL8NK0QZZK');
          `}
        </Script>
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
