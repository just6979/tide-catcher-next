import type {Metadata} from "next"
import "./globals.css"
import Head from "@/app/head"
import Header from '@/app/header'
import {Suspense} from "react";
import Loading from "@/app/loading";
import Footer from '@/app/footer'

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
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
        <Footer/>
      </body>
    </html>
  )
}
