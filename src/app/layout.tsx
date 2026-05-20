import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Playfair_Display, DM_Sans, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { loadTestimonials } from "@/lib/data";
import { siteBrand, siteUrl } from "@/lib/site-config";
import "./globals.css";

// Non-critical interactive widgets — lazy-loaded to reduce main bundle size
const CookieConsent = dynamic(() =>
  import("@/components/CookieConsent").then((mod) => ({
    default: mod.CookieConsent,
  })),
);
const ChatWidget = dynamic(() =>
  import("@/components/ChatWidget").then((mod) => ({
    default: mod.ChatWidget,
  })),
);
const AccessibilityWidget = dynamic(
  () => import("@/components/AccessibilityWidget"),
);
const ScrollToTop = dynamic(() =>
  import("@/components/ScrollToTop").then((mod) => ({
    default: mod.ScrollToTop,
  })),
);
const ServiceWorkerRegistration = dynamic(() =>
  import("@/components/ServiceWorkerRegistration").then((mod) => ({
    default: mod.ServiceWorkerRegistration,
  })),
);

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
    default: `${siteBrand.name} | ${siteBrand.category}`,
    template: `%s | ${siteBrand.name}`,
  },
  description: siteBrand.description,
  keywords: [
    "Philadelphia real estate",
    "luxury homes Philadelphia",
    "real estate brokerage",
    "LYL Realty Group",
    "Loving Your Living",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteBrand.name,
    url: siteUrl,
    title: `${siteBrand.name} | ${siteBrand.category}`,
    description: siteBrand.description,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteBrand.name} — ${siteBrand.category}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteBrand.name} | ${siteBrand.category}`,
    description: siteBrand.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const testimonials = await loadTestimonials();

  return (
    <html lang="en" className="dark a11y-high-contrast" suppressHydrationWarning>
      <head>
        {/* Force dark high-contrast mode — light/low-contrast mode is not production-ready. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('dark','a11y-high-contrast');try{localStorage.setItem('lyl-theme','dark');var p=JSON.parse(localStorage.getItem('lyl-a11y-prefs')||'{}');if(p.highContrast!==false){p.highContrast=true;localStorage.setItem('lyl-a11y-prefs',JSON.stringify(p));}}catch(e){}})()`,
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
        <OrganizationJsonLd testimonials={testimonials} />
        <WebSiteJsonLd />
        {children}
        <ScrollToTop />
        <ChatWidget />
        <AccessibilityWidget />
        <CookieConsent />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
