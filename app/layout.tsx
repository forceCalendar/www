import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";
import ReleaseBanner from "./components/ReleaseBanner";

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
    default: "forceCalendar - Calendar Infrastructure for Enterprise",
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "forceCalendar: calendar infrastructure for strict enterprise environments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "forceCalendar",
    description:
      "Calendar infrastructure for strict enterprise environments. Zero dependencies. MIT licensed.",
    images: ["/og-image.png"],
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
      <head>
        <script
          // Resolve theme before first paint so OS-dark visitors with no
          // cookie do not get a light flash
          dangerouslySetInnerHTML={{
            __html: `try{var t=document.cookie.match(/(?:^|; )theme=(dark|light)/);var d=t?t[1]==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <ThemeProvider initialTheme={initialTheme}>
          <ReleaseBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
