"use client"

import TidesFromStationElement from "@/app/components/TidesFromStationElement"
import { defaultStation } from "@/app/lib/constants"
import { useParams } from "next/navigation"

export default function TidesFromStation() {
  const { id } = useParams<{ id: string }>()
  const stationId = id && id.length > 0 ? id[0] : defaultStation
  return <TidesFromStationElement id={stationId} />
}
