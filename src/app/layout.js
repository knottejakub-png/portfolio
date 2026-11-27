import { Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

const siteUrl = 'https://buildary.cz'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Buildary — Digital Product Builder',
    template: '%s · Buildary',
  },
  description:
    'Buildary — I design and build web & mobile applications, from the first idea to a finished product that works.',
  keywords: [
    'Buildary',
    'web developer',
    'app developer',
    'digital products',
    'Next.js',
    'React',
    'full-stack',
    'Czech Republic',
    'Jakub Knotte',
  ],
  authors: [{ name: 'Jakub Knotte' }],
  creator: 'Jakub Knotte',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Buildary',
    title: 'Buildary — Digital Product Builder',
    description:
      'I turn your ideas into real, working products — web & mobile apps from concept to launch.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Buildary — We build apps & webs that work.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildary — Digital Product Builder',
    description:
      'I turn your ideas into real, working products — web & mobile apps from concept to launch.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-[#0A0E17] text-[#EAF0FB]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
