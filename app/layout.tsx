import Footer from "@/app/footer"
import Header from "@/app/header"
import Loading from "@/app/loading"
import type { Metadata, Viewport } from "next"
import { Share_Tech_Mono, Sono, Source_Code_Pro } from "next/font/google"
import { ReactNode, Suspense } from "react"

import "./globals.css"

const monoFont = Sono({ weight: "400" })
const scpFont = Source_Code_Pro({weight: "400"})

export const metadata: Metadata = {
  title: {
    default: "Tide Catcher",
    template: "Tide Catcher %s",
  },
  applicationName: "Tide Catcher",
  description:
    "Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
}

export const viewport: Viewport = {
  themeColor: "lightblue",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={scpFont.className}>
      <body>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  )
}
