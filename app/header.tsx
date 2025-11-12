import { Trade_Winds } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const tradeWinds = Trade_Winds({ weight: "400" })

export default function Header() {
  return (
    <header id="header">
      <Link href="/">
        <Image
          id="logo"
          src="/images/wave-line-icon-192.png"
          alt="Site Logo"
          width={64}
          height={64}
          unoptimized={false}
        />
        <h1 className={tradeWinds.className}>Tide Catcher</h1>
      </Link>
    </header>
  )
}
