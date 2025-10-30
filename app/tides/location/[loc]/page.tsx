"use client"

import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import TidesFromLocation from "@/app/_components/TidesFromLocation"
import { coordsFromString } from "@/app/_lib/coords"
import { useParams } from "next/navigation"

export default function TidesByLocation() {
  const { loc } = useParams<{ loc: string }>()
  const location = decodeURIComponent(loc)

  if (coordsFromString(location)) {
    return <TidesFromLocation location={location} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid location: [${location}]`} />
      <StartOver />
    </div>
  )
}
