"use client"

import Loading from "@/app/loading"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from "react"

export default function Footer() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <footer>
      <Suspense fallback={<Loading />}>
        <nav>
          <Link
            className={`link ${pathname === "/" || pathname === "/tides" ? "active-route" : ""}`}
            href={"/tides"}
          >
            <button>Chooser</button>
          </Link>
          <Link
            className={`${pathname === "/about" ? "active-route" : ""}`}
            href={"/about"}
          >
            <button>About</button>
          </Link>
        </nav>
      </Suspense>
      <p>
        &copy; 2025 <a href="mailto:jw@justinwhite.net">Justin White</a>
      </p>
    </footer>
  )
}
