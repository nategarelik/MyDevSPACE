import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { QueryProvider } from '@/components/query-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ultimate AI IDE',
  description: 'The Ultimate AI-Powered Development Environment',
  keywords: [
    'AI', 
    'IDE', 
    'Development Environment', 
    'Claude Code', 
    'AI Agents', 
    'Productivity'
  ],
  authors: [{ name: 'Ultimate AI IDE Team' }],
  creator: 'Ultimate AI IDE',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ultimate-ai-ide.com',
    title: 'Ultimate AI IDE',
    description: 'The Ultimate AI-Powered Development Environment',
    siteName: 'Ultimate AI IDE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ultimate AI IDE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultimate AI IDE',
    description: 'The Ultimate AI-Powered Development Environment',
    images: ['/og-image.png'],
    creator: '@ultimateaiide',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}