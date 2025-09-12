import type { Metadata } from "next"
import "./globals.css"

import Head from "./head"
import Header from './header'
import Footer from './footer'

export const metadata: Metadata = {
  title: "Tide Catcher Next",
  description: "Tides served with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head/>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
