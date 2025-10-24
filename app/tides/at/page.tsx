"use client"

import TidesFromLocationElement from "@/app/components/TidesFromLocationElement"
import TidesFromStationElement from "@/app/components/TidesFromStationElement"
import { coordsFromString } from "@/app/lib/coords"
import TidesFromGeolocation from "@/app/tides/gps/page"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { JSX } from "react"

export default function TidesAt() {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const station = searchParams.get("station")

  if (location) {
    if (location == "gps") {
      return <TidesFromGeolocation />
    }
    if (coordsFromString(location)) {
      return <TidesFromLocationElement location={location} />
    }
    return <Error msg={`Invalid location: ${location}`} />
  }

  if (station) {
    if (station.length == 7) {
      return <TidesFromStationElement id={station} />
    }
    return <Error msg={`Invalid station: ${station}`} />
  }

  return <Error msg={"No valid Station or Location provided."} />
}

function Error(props: { msg: string }): JSX.Element {
  return (
    <div>
      <p>{props.msg}</p>
      <p>
        <Link href="/tides">Go Back</Link>
      </p>
    </div>
  )
}
