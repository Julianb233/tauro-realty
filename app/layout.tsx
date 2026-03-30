import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Shipping Savior — Progress Portal",
  description: "Your project dashboard powered by AI Acrobatics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen pb-24 lg:pb-8">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
        <BottomNav />
        <footer className="fixed bottom-0 left-0 right-0 pb-[calc(env(safe-area-inset-bottom)+76px)] lg:pb-4 text-center pointer-events-none">
          <p className="text-xs text-slate-600">Powered by AI Acrobatics</p>
        </footer>
      </body>
    </html>
  );
}
