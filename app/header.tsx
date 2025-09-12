import Link from 'next/link'

export default function Header() {
  return (
    <div id="title">
      <Link href="/#">
        <img id="logo" src="../static/images/wave_left_48.png" alt="Site Logo"/>
        <h1>Tide Catcher</h1>
      </Link>
    </div>
  )
}

