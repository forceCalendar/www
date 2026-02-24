import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://forcecalendar.org"),
  title: {
    default: "forceCalendar — Calendar Infrastructure for Enterprise",
    template: "%s | forceCalendar",
  },
  description:
    "Calendar infrastructure for strict enterprise environments. Zero dependencies. MIT licensed. Built for Salesforce Locker Service and strict CSP.",
  keywords: [
    "calendar",
    "salesforce",
    "enterprise",
    "javascript",
    "web components",
    "locker service",
    "csp",
    "zero dependencies",
  ],
  openGraph: {
    title: "forceCalendar",
    description:
      "Calendar infrastructure for strict enterprise environments. Zero dependencies. MIT licensed.",
    url: "https://forcecalendar.org",
    siteName: "forceCalendar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "forceCalendar",
    description:
      "Calendar infrastructure for strict enterprise environments. Zero dependencies. MIT licensed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang="en"
      className={`${inter.className} ${initialTheme === "dark" ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <ThemeProvider initialTheme={initialTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
