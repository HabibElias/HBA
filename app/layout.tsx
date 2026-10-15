import { Analytics } from "@vercel/analytics/next";
import {
  Fraunces,
  Plus_Jakarta_Sans,
  Noto_Serif_Ethiopic,
  Noto_Sans_Ethiopic,
} from "next/font/google";
import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/lib/context/language-context";
import { HeaderNav } from "@/components/navigation/header-nav";
import { Footer } from "@/components/navigation/footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-serif-ethiopic",
  display: "swap",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-sans-ethiopic",
  display: "swap",
});

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
  colorScheme: "light dark",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${notoSerifEthiopic.variable} ${notoSansEthiopic.variable}`}
    >
      <body className="min-h-screen antialiased selection:bg-[#3A33A0] selection:text-white flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <HeaderNav />
          <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
          <Footer />
        </LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
