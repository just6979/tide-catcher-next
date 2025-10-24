"use client"

import TidesFromLocationElement from "@/app/components/TidesFromLocationElement"
import { defaultLocation } from "@/app/lib/constants"
import { coordsFromString } from "@/app/lib/coords"
import TidesFromGeolocation from "@/app/tides/gps/page"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function TidesFromLocation() {
  const { loc } = useParams<{ loc: string }>()

  if (!loc) {
    return <TidesFromLocationElement location={defaultLocation} />
  }

  const location = decodeURIComponent(loc[0])

  if (location === "gps") {
    return <TidesFromGeolocation />
  }

  if (coordsFromString(location)) {
    return <TidesFromLocationElement location={location} />
  }

  return (
    <div>
      <p>
        <span className="error">Error:</span>
        Invalid location &ldquo;{location}&rdquo;
      </p>
      <p>
        <Link href="/">Start Over</Link>
      </p>
    </div>
  )
}
