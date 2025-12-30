import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "forceCalendar - Enterprise Calendar Components for Salesforce",
  description: "A powerful, framework-agnostic calendar engine built for enterprise platforms. Pure JavaScript with zero DOM dependencies. Perfect for Salesforce, Lightning Web Components, and modern web applications.",
  keywords: ["calendar", "salesforce", "enterprise", "javascript", "web components", "lwc", "timezone", "ics", "recurring events"],
  authors: [{ name: "forceCalendar Team" }],
  openGraph: {
    title: "forceCalendar - Enterprise Calendar Components",
    description: "Framework-agnostic calendar engine for enterprise platforms",
    url: "https://forcecalendar.org",
    siteName: "forceCalendar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "forceCalendar - Enterprise Calendar Components",
    description: "Framework-agnostic calendar engine for enterprise platforms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
