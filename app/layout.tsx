import { Analytics } from '@vercel/analytics/next'
import { DM_Serif_Display, Geist, Noto_Serif_Ethiopic } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })
const notoEthiopic = Noto_Serif_Ethiopic({ subsets: ['ethiopic'], variable: '--font-ethiopic' })

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
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} ${dmSerif.variable} ${notoEthiopic.variable} antialiased font-sans`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
