import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "forceCalendar - Enterprise Calendar Infrastructure",
  description: "Production-grade calendar infrastructure for enterprise platforms. Choose your integration level with pure JavaScript logic or ready-to-use Web Components. Built for Salesforce and modern enterprise applications.",
  keywords: ["calendar", "salesforce", "enterprise", "javascript", "web components", "lwc", "timezone", "ics", "recurring events", "calendar infrastructure"],
  authors: [{ name: "forceCalendar Team" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "forceCalendar - Enterprise Calendar Infrastructure",
    description: "Production-grade calendar infrastructure. Choose your integration level.",
    url: "https://forcecalendar.org",
    siteName: "forceCalendar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "forceCalendar - Enterprise Calendar Infrastructure",
    description: "Production-grade calendar infrastructure. Choose your integration level.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
