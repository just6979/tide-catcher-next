"use client"

import TidesFromStationElement from "@/app/components/TidesFromStationElement"
import { defaultStation } from "@/app/lib/constants"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function TidesFromStation() {
  const { id } = useParams<{ id: string }>()
  const stationId = id && id.length > 0 ? id[0] : defaultStation

  if (!stationId) {
    return <TidesFromStationElement id={defaultStation} />
  }

  if (stationId.length === 7) {
    return <TidesFromStationElement id={stationId} />
  }

  return (
    <div>
      <p>
        <span className="error">Error:</span>
        Invalid station &ldquo;{stationId}&rdquo;
      </p>
      <p>
        <Link href="/">Start Over</Link>
      </p>
    </div>
  )
}
