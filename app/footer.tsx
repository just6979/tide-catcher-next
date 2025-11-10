import Link from "next/link"

export default function Footer() {
  return (
    <footer>
      <nav>
        <Link href={"/"}><button>Tides</button></Link>
        <Link href={"/about"}><button>About</button></Link>
      </nav>
      <p>
        &copy; 2025 <a href="mailto:jw@justinwhite.net">Justin White</a>
      </p>
    </footer>
  )
}
