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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buildary — Digital Product Builder',
    description:
      'I turn your ideas into real, working products — web & mobile apps from concept to launch.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-[#fbfbfc] text-[#16181d]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
