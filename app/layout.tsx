import type {Metadata} from "next"
import "./globals.css"
import Script from "next/script";
import Header from '@/app/header'
import {Suspense} from "react";
import Loading from "@/app/loading";
import Footer from '@/app/footer'

export const metadata: Metadata = {
  title: "Tide Catcher",
  description: "Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="/static/js/contrib/jquery-3.1.0.min.js"/>
      <Script src="/static/js/contrib/underscore-1.8.3-min.js"/>
      <Script src="/static/js/contrib/backbone-1.3.3-min.js"/>
      <Script src="/static/js/contrib/mustache-2.2.1.min.js"/>
      <Script src="/static/js/index.js"/>
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
