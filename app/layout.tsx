import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B2440",
};

export const metadata: Metadata = {
  title: "LYL Realty Group — Progress Portal",
  description: "Your project dashboard for the LYL Realty Group website build. Powered by AI Acrobatics.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-[#c5c3d1] p-1 sm:p-3 md:p-4 lg:p-6">
          <div className="mx-auto max-w-[1400px] rounded-xl sm:rounded-2xl lg:rounded-3xl bg-[#f5f4f0] p-3 sm:p-4 lg:p-6 shadow-2xl">
            <TopNav />
            <main className="min-h-[calc(100vh-4rem)] pb-20 lg:pb-4">
              {children}
            </main>
            <footer className="text-center py-4">
              <p className="text-xs text-gray-600">Powered by AI Acrobatics</p>
            </footer>
          </div>
        </div>
        <BottomNav />
        <ChatWidget />
      </body>
    </html>
  );
}
