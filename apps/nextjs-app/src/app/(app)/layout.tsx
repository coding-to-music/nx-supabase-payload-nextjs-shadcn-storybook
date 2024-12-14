import type { Metadata } from 'next'

import { cn } from '@/utils/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { InitTheme } from '@/theme/InitTheme'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { HeaderThemeProvider } from '@/theme/header/HeaderThemeProvider'
import { mergeOpenGraph } from '@/utils/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { AdminBar } from './_/AdminBar'
import { Footer } from './_/Footer'
import { Header } from './_/Header'
import { LivePreviewListener } from './_/LivePreviewListener'

import './global.css'
import { getServerSideUrl } from '@my-project/utils'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>
          <HeaderThemeProvider>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <LivePreviewListener />

            <Header />
            {children}
            <Footer />
          </HeaderThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideUrl()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
