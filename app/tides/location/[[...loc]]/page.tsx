"use client"

import TidesFromGeolocation from "@/app/_components/TidesFromGeolocationElement"
import TidesFromLocationElement from "@/app/_components/TidesFromLocationElement"
import { DEFAULT_LOCATION } from "@/app/_lib/constants"
import { coordsFromString } from "@/app/_lib/coords"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function TidesFromLocation() {
  const { loc } = useParams<{ loc: string }>()

  if (!loc) {
    return <TidesFromLocationElement location={DEFAULT_LOCATION} />
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
        <Link href="/" prefetch={true}>Start Over</Link>
      </p>
    </div>
  )
}
