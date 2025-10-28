"use client"

import TidesFromStationElement from "@/app/_components/TidesFromStationElement"
import { DEFAULT_STATION } from "@/app/_lib/constants"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function TidesFromStation() {
  const { id } = useParams<{ id: string }>()
  const stationId = id && id.length > 0 ? id[0] : DEFAULT_STATION

  if (!stationId) {
    return <TidesFromStationElement id={DEFAULT_STATION} />
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
        <Link href="/" prefetch={true}>Start Over</Link>
      </p>
    </div>
  )
}
