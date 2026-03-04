import type { Metadata } from "next";
import { Unbounded, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LESKILL — Creative Developer Portfolio",
  description:
    "Independent creative developer building functionality aimed at the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${cormorant.variable} ${spaceGrotesk.variable} antialiased bg-void text-ink overflow-x-hidden`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
