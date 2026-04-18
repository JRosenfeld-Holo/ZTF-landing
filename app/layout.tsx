import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zero to Fluent — 2-Day AI Workshop in Frisco, TX',
  description: 'Become AI-fluent in 2 days. A hands-on, in-person AI workshop for small business owners in DFW. April 21–22, 2026. Only 40 seats.',
  openGraph: {
    title: 'Zero to Fluent — 2-Day AI Workshop in Frisco, TX',
    description: 'Hands-on AI training for DFW small business owners. April 21–22 in Frisco. $697/seat. Only 40 seats.',
    type: 'website',
    url: 'https://zerotofluent.ai',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
