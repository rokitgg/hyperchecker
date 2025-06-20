import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import "~/app/globals.css";

import { env } from "~/env";
import { ContextProviders } from "~/lib/providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://hyperchecker.vercel.app"
      : "http://localhost:3000",
  ),
  title: "HyperChecker",
  description: "All your HyperEVM points in one place.",
  openGraph: {
    title: "HyperChecker",
    description: "All your HyperEVM points in one place.",
    url: "https://hyperchecker.vercel.app",
    siteName: "HyperChecker",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rokitdotgg",
    creator: "@rokitdotgg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          forcedTheme="dark"
        >
          <ContextProviders>{props.children}</ContextProviders>
          <Toaster position="top-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
