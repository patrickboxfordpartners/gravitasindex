import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://gravitasindex.com'),
  title: {
    default: "GRAVITAS INDEX | Win Google's Entity Search",
    template: "%s | GRAVITAS INDEX",
  },
  description: "Transform your business into a market authority Google can't ignore. Data-driven entity optimization that turns search invisibility into market dominance.",
  keywords: ["entity search", "SEO", "real estate marketing", "Google optimization", "market authority", "entity optimization"],
  authors: [{ name: "GRAVITAS INDEX" }],
  creator: "GRAVITAS INDEX",
  publisher: "GRAVITAS INDEX",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GRAVITAS INDEX",
    title: "GRAVITAS INDEX | Win Google's Entity Search",
    description: "Transform your business into a market authority Google can't ignore.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GRAVITAS INDEX',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRAVITAS INDEX | Win Google's Entity Search",
    description: "Transform your business into a market authority Google can't ignore.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add when you set up Google Search Console
    // google: 'verification-code',
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
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased bg-bg text-text-main font-sans`}
      >
        <Suspense fallback={children}>
          <PostHogProvider>{children}</PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
