import { Trade_Winds } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const tradeWinds = Trade_Winds({ weight: "400" })

export default function Header() {
  return (
    <div id="header">
      <Link href="/">
        <Image
          id="logo"
          src="/images/wave_left_480.png"
          alt="Site Logo"
          width={48}
          height={48}
          unoptimized={false}
        />
        <h1 className={tradeWinds.className}>Tide Catcher</h1>
      </Link>
    </div>
  )
}
