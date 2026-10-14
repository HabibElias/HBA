import { Analytics } from '@vercel/analytics/next'
import { Fraunces, Inter, Noto_Serif_Ethiopic, Noto_Sans_Ethiopic } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerifEthiopic = Noto_Serif_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-noto-serif-ethiopic',
  display: 'swap',
})

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-noto-sans-ethiopic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hiwot Birhan Addis Ababa Summit branch | There is room for you here',
  description: 'Hiwot Birhan Addis Ababa Summit branch is a welcoming community for the curious, the hopeful, and everyone in between.',
  icons: {
    icon: '/icon.svg',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F6' },
    { media: '(prefers-color-scheme: dark)', color: '#14122B' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${notoSerifEthiopic.variable} ${notoSansEthiopic.variable}`}
    >
      <body className="min-h-screen antialiased selection:bg-[#3A33A0] selection:text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
