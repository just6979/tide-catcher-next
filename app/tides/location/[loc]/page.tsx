"use client"

import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import TidesFromGeolocation from "@/app/_components/TidesFromGeolocationElement"
import TidesFromLocationElement from "@/app/_components/TidesFromLocationElement"
import { coordsFromString } from "@/app/_lib/coords"
import { useParams } from "next/navigation"

export default function TidesFromLocation() {
  const { loc } = useParams<{ loc: string }>()

  const location = decodeURIComponent(loc)

  if (location === "gps") {
    return <TidesFromGeolocation />
  }

  if (coordsFromString(location)) {
    return <TidesFromLocationElement location={location} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid location: [${location}]`} />
      <StartOver />
    </div>
  )
}
