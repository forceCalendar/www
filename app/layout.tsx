import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://forcecalendar.org"),
  title: {
    default: "forceCalendar",
    template: "%s | forceCalendar",
  },
  description:
    "Calendar infrastructure for enterprise platforms. Zero dependencies. Built for Salesforce Locker Service.",
  keywords: [
    "calendar",
    "salesforce",
    "enterprise",
    "javascript",
    "web components",
  ],
  openGraph: {
    title: "forceCalendar",
    description: "Calendar infrastructure for enterprise platforms.",
    url: "https://forcecalendar.org",
    siteName: "forceCalendar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "forceCalendar",
    description: "Calendar infrastructure for enterprise platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
