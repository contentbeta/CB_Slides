import type { Metadata } from "next";
import localFont from "next/font/local";
import { Syne, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MixpanelInitializer from "./MixpanelInitializer";
import { Toaster } from "@/components/ui/sonner";
const inter = localFont({
  src: [
    {
      path: "./fonts/Inter.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cb-deck-maker.local"),
  title: "CB-Deck-Maker - Open Source AI presentation generator",
  description:
    "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
  keywords: [
    "AI presentation generator",
    "data storytelling",
    "data visualization tool",
    "AI data presentation",
    "presentation generator",
    "data to presentation",
    "interactive presentations",
    "professional slides",
  ],
  openGraph: {
    title: "CB-Deck-Maker - Open Source AI presentation generator",
    description:
      "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
    url: "https://cb-deck-maker.local",
    siteName: "CB-Deck-Maker",
    images: [
      {
        url: "https://cb-deck-maker.local/cb-deck-maker-logo.png",
        width: 1200,
        height: 630,
        alt: "CB-Deck-Maker Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://cb-deck-maker.local",
  },
  twitter: {
    card: "summary_large_image",
    title: "CB-Deck-Maker - Open Source AI presentation generator",
    description:
      "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
    images: ["https://cb-deck-maker.local/cb-deck-maker-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${syne.variable} ${unbounded.variable} antialiased`}
      >
        <Providers>
          <MixpanelInitializer>

            {children}

          </MixpanelInitializer>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
