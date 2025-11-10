"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  return (
    <div>
      <h2>404: Not Found</h2>
      <p>Could not find requested resource.</p>
      <p>
        <Link href="/">Start Over</Link>
        <br />
        or
        <br />
        <Link
          onClick={(event) => {
            event.preventDefault()
            router.back()
          }}
          href={"."}
        >
          Go Back
        </Link>
      </p>
    </div>
  )
}
