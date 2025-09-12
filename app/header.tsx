import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <div id="title">
      <Link href="/#">
        <Image id="logo" src="/static/images/wave_left_48.png" alt="Site Logo" width={48} height={48}/>
        <h1>Tide Catcher</h1>
      </Link>
    </div>
  )
}

