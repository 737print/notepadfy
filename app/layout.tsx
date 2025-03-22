import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://notepadfy.com'),
  title: {
    default: 'Notepadfy | Free Online Notepad - No Login Required',
    template: '%s | Notepadfy'
  },
  description: 'Create, edit and share notes online with Notepadfy. Free, secure, and no login required. Features include password protection, custom URLs, and markdown support.',
  keywords: [
    'online notepad',
    'free text editor',
    'secure notes',
    'password protected notes',
    'markdown editor',
    'custom url notes',
    'temporary notes',
    'share notes online',
    'web notepad',
    'online text editor'
  ],
  authors: [{ name: 'Notepadfy Team' }],
  creator: 'Notepadfy',
  publisher: 'Notepadfy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://notepadfy.com',
    title: 'Notepadfy | Free Online Notepad - No Login Required',
    description: 'Create, edit and share notes online with Notepadfy. Free, secure, and no login required.',
    siteName: 'Notepadfy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Notepadfy - Free Online Notepad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notepadfy | Free Online Notepad',
    description: 'Create, edit and share notes online with Notepadfy. Free, secure, and no login required.',
    images: ['/twitter-image.png'],
    creator: '@notepadfy',
    site: '@notepadfy',
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
      'yandex-verification': 'your-yandex-verification-code',
    },
  },
  category: 'Technology',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-maskable.png', sizes: '512x512', type: 'image/png', rel: 'maskable' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7740044248569632"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="notepadfy-theme"
        >
          <div className="min-h-screen flex flex-col">
            <div className="fixed inset-0 -z-10 h-full w-full dark:bg-[#000000] bg-[#ffffff] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"></div>
            <Header />
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    {children}
                    <div className="ad-footer">
                      {/* AdSense Footer Banner */}
                    </div>
                  </div>
                  <aside className="ad-sidebar">
                    {/* AdSense Sidebar */}
                  </aside>
                </div>
              </div>
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  )
} 