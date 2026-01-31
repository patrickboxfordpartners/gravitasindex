import type { Metadata } from "next";
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
  title: "GRAVITAS INDEX | Win Google's Entity Search",
  description: "Transform your business into a market authority Google can't ignore. Data-driven entity optimization that turns search invisibility into market dominance.",
  openGraph: {
    title: "GRAVITAS INDEX | Win Google's Entity Search",
    description: "Transform your business into a market authority Google can't ignore.",
    images: ['/og-image.jpg'],
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
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
