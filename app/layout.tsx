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
    generator: 'v0.app',
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
      <body className="font-sans antialiased overflow-x-hidden w-full max-w-full bg-zinc-950">
        <SettingsProvider settings={settings}>
          <AuthProvider>
            <CartProvider>
              {children}
              <ToastContainer theme="dark" position="bottom-right" />
            </CartProvider>
          </AuthProvider>
        </SettingsProvider>
        <Analytics />
        {/* v0 – built-with badge */}
        <div dangerouslySetInnerHTML={{
          __html: `<div id="v0-built-with-button-0ace57ac-6766-4ccd-9f82-c48889a5ad7c" style="
border: 1px solid hsl(0deg 0% 100% / 12%);
position: fixed;
bottom: 24px;
right: 24px;
z-index: 1000;
background: #121212;
color: white;
padding: 8px 12px;
border-radius: 8px;
font-weight: 400;
font-size: 14px;
box-shadow: 0 2px 8px rgba(0,0,0,0.12);
letter-spacing: 0.02em;
transition: all 0.2s;
display: flex;
align-items: center;
gap: 4px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
<a
  href="https://v0.app/chat/api/open/built-with-v0/b_Ib4CfQ60VOT?ref=GODW4K"
  target="_blank"
  rel="noopener"
  style="
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
  "
>
  Built with
  <svg
    fill="currentColor"
    viewBox="0 0 147 70"
    xmlns="http://www.w3.org/2000/svg"
    style="width: 20px; height: 20px;"
  >
    <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z" />
    <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z" />
  </svg>
</a>

<button
  onclick="document.getElementById('v0-built-with-button-0ace57ac-6766-4ccd-9f82-c48889a5ad7c').style.display='none'"
  onmouseenter="this.style.opacity='1'"
  onmouseleave="this.style.opacity='0.7'"
  style="
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 2px;
    margin-left: 4px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    opacity: 0.7;
    transition: opacity 0.2s;
    transform: translateZ(0);
  "
  aria-label="Close"
>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
</button>

<span style="
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
">
  v0
</span>
</div>` }} />
      </body>
    </html>
  )
}
