"use client"

import TidesFromStationElement from "@/app/_components/TidesFromStationElement"
import { STATION_ID_REGEX } from "@/app/_lib/constants"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function TidesFromStation() {
  const { id } = useParams<{ id: string }>()

  if (STATION_ID_REGEX.test(id)) {
    return <TidesFromStationElement id={id} />
  }

  return (
    <div>
      <p>
        <span className="error">Error:</span>
        Invalid Station ID: &ldquo;{id}&rdquo;
      </p>
      <p>
        <Link href="/" prefetch={true}>
          Start Over
        </Link>
      </p>
    </div>
  )
}
