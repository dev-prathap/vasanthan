import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: "swap",
});
const bebas = Bebas_Neue({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vasanthan | Viral Content Architect & Video Editor",
  description: "Advanced cinematic portfolio of R. Vasanthan. Specializing in high-energy social media editing, sports videography, and viral storytelling.",
  keywords: ["Video Editor", "Cinematic Videography", "Vasanthan", "Social Media Marketing", "Brazil Legends", "Football Plus"],
  authors: [{ name: "R. Vasanthan" }],
  openGraph: {
    title: "Vasanthan | Viral Content Architect",
    description: "300+ videos, millions of views. Step into the cinematic edit.",
    url: "https://vasanthan.com",
    siteName: "Vasanthan Portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasanthan | Video Editor",
    description: "Crafting viral legends, one frame at a time.",
    images: ["/og-image.jpg"],
  },
};

import { SmoothScroll } from "@/components/layout/SmoothScroll";

import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, bebas.variable, "dark")}>
      <body className="antialiased bg-black text-white">
        <SmoothScroll>
          <div className="film-grain" />
          <div className="scanlines" />
          <CustomCursor />
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
