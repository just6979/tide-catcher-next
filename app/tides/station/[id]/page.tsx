"use client"

import TidesFromStationElement from "@/app/_components/TidesFromStationElement"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function TidesFromStation() {
  const { id } = useParams<{ id: string }>()
  if (id.length === 7) {
    return <TidesFromStationElement id={id} />
  }
  return (
    <div>
      <p>
        <span className="error">Error:</span>
        Invalid station &ldquo;{id}&rdquo;
      </p>
      <p>
        <Link href="/" prefetch={true}>
          Start Over
        </Link>
      </p>
    </div>
  )
}
