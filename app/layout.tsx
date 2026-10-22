import { Analytics } from "@vercel/analytics/next";

import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Hiwot Birhan Addis Ababa Summit branch | There is room for you here",
  description:
    "Hiwot Birhan Addis Ababa Summit branch is a welcoming community for the curious, the hopeful, and everyone in between.",
  icons: {
    icon: "/icon.svg",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#14122B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", figtree.variable)}>
      <body className="min-h-screen antialiased selection:bg-[#3A33A0] selection:text-white flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
