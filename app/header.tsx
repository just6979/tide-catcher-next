import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <div id="header">
      <Link href="/#">
        <Image
          id="logo"
          src="/images/wave_left_480.png"
          alt="Site Logo"
          width={48} height={48}
          unoptimized={false}
        />
        <h1>Tide Catcher</h1>
      </Link>
    </div>
  )
}
