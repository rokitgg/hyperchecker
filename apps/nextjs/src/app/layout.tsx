import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import "~/app/globals.css";

import { env } from "~/env";
import { ContextProviders } from "~/lib/providers";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://ultimate-starter-kit.vercel.app"
      : "http://localhost:3000",
  ),
  title: "Ultimate Starter Kit",
  description: "Ultimate Starter Kit",
  openGraph: {
    title: "Ultimate Starter Kit",
    description:
      "A collection of the best open-souce tooling to build your full-stack application.",
    url: "https://ultimate-starter-kit.vercel.app",
    siteName: "Ultimate Starter Kit",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ContextProviders>{props.children}</ContextProviders>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
