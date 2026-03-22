import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatAgent } from '@/components/agent/ChatAgent'
import { CookieBanner } from '@/components/layout/CookieBanner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hoptisens',
  description: 'Agence IA & Automatisation',
  icons: {
    icon: '/etoile_fleche_sans_fond.png',
    apple: '/etoile_fleche_sans_fond.png',
  },
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1 min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <ChatAgent />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
