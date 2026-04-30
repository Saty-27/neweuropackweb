import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import CookieConsent from "@/components/shared/CookieConsent";
import PageTracker from "@/components/shared/PageTracker";
import { Suspense } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Europack | India's #1 Largest Industrial Packaging Solutions",
  description: "Europack is India's trusted leader in ISPM-15 certified wooden crates, wooden pallets, corrugated boxes, dunnage bags, and precision industrial packaging. 33+ years, 1000+ clients.",
  keywords: "wooden pallets, corrugated boxes, industrial packaging, custom crates, Europack, export packaging, ISPM-15, dunnage bags, stretch wrap, anti-rust coating",
  openGraph: {
    title: "Europack | India's #1 Trusted Industrial Packaging Solutions",
    description: "India's trusted leader in ISPM-15 certified industrial packaging. 1000+ clients, 33+ years.",
    siteName: "Europack",
    type: "website"
  },
  icons: {
    icon: '/images/logo/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Toaster position="top-right" />
        <Suspense fallback={null}>
          <PageTracker />
        </Suspense>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}


