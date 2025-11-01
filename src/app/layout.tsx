import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Urbanist } from 'next/font/google';

const font = Urbanist({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'nexBT Holdings Inc.',
  description: 'Investing in Filipino founders with malasakit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${font.className} bg-[var(--bg-gradient)] text-gray-100`}>{children}</body>
    </html>
  );
}
