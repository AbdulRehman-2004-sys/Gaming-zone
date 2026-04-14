import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { poppins } from './fonts'
import './globals.css'
import { getSettings } from "@/lib/actions/settings"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SettingsProvider } from "@/context/SettingsContext"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const siteTitle = settings?.siteTitle || 'CORSAIR - Premium Gaming Gear & PC Components'

  return {
    title: siteTitle,
    description: 'Shop high-performance gaming peripherals, PC cases, cooling solutions, and gaming gear. Premium hardware for gamers and enthusiasts.',
    keywords: ['gaming gear', 'PC components', 'peripherals', 'keyboards', 'mice', 'headsets'],
    icons: {
      icon: [
        {
          url: settings?.siteLogo || '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
    },
  }
}

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSettings()
  const primaryColor = settings?.primaryColor || "#facc15"

  return (
    <html lang="en" className={poppins.variable} style={{
      scrollBehavior: 'smooth',
      scrollPaddingTop: '56px',
      // @ts-ignore
      '--primary-color': primaryColor
    }}>
      <body suppressHydrationWarning className="font-sans antialiased overflow-x-hidden w-full max-w-full bg-zinc-950">
        <SettingsProvider settings={settings}>
          <AuthProvider>
            <CartProvider>
              {children}
              <ToastContainer theme="dark" position="bottom-right" />
            </CartProvider>
          </AuthProvider>
        </SettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}
