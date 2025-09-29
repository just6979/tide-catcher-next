import type {Metadata, Viewport} from "next"
import Script from "next/script";
import {ReactNode, Suspense} from "react";

import Header from '@/app/header'
import Loading from "@/app/loading";
import Footer from '@/app/footer'

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: 'Tide Catcher',
    template: '%s | Tide Catcher'
  },
  applicationName: 'Tide Catcher',
  description: 'Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
}

export const viewport: Viewport = {
  themeColor: 'lightblue'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
        <Header/>
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
        <Footer/>
      </body>
    </html>
  )
}
