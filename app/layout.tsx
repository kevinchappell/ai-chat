import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'highlight.js/styles/github-dark.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kinesys AI Chat',
  description: 'Chat with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
