import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const siteUrl = 'https://portfolio-ashen-nine-29.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jakub Knotte — Web Developer',
    template: '%s · Jakub Knotte',
  },
  description:
    'Web developer & IT student building modern, functional web applications — from first idea to a finished product that works.',
  keywords: [
    'web developer',
    'web application',
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
    siteName: 'Jakub Knotte',
    title: 'Jakub Knotte — Web Developer',
    description:
      'I turn your ideas into real, working products. Full-stack web apps from concept to launch.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jakub Knotte — Web Developer',
    description:
      'I turn your ideas into real, working products. Full-stack web apps from concept to launch.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-cream">
        {children}
      </body>
    </html>
  )
}
