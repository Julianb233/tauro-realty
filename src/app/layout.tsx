import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "LYL Realty Group | Website Under Construction",
    template: "%s | LYL Realty Group",
  },
  description:
    "LYL Realty Group is updating its Philadelphia real estate website. Contact the Philadelphia office for current real estate support.",
  keywords: [
    "Philadelphia real estate",
    "LYL Realty Group",
    "real estate brokerage",
    "Dayhna Carroll",
    "Germantown Philadelphia real estate",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LYL Realty Group",
    url: siteUrl,
    title: "LYL Realty Group | Website Under Construction",
    description:
      "LYL Realty Group is updating its Philadelphia real estate website. Contact the office for current support.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "LYL Realty Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LYL Realty Group | Website Under Construction",
    description:
      "LYL Realty Group is updating its Philadelphia real estate website.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Force dark mode — light mode not production-ready */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('dark');try{localStorage.setItem('tauro-theme','dark')}catch(e){}})()`,
          }}
        />
        {/* Preconnect to critical external origins for faster LCP */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${montserrat.variable} min-h-screen overflow-x-hidden bg-background text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-[9999] -translate-y-full rounded-br-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
