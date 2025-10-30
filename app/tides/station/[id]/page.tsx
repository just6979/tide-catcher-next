"use client"

import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import TidesFromStationElement from "@/app/_components/TidesFromStationElement"
import { STATION_ID_REGEX } from "@/app/_lib/constants"
import { useParams } from "next/navigation"

export default function TidesFromStation() {
  const { id } = useParams<{ id: string }>()

  if (STATION_ID_REGEX.test(id)) {
    return <TidesFromStationElement id={id} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid station ID: ${id}`} />
      <StartOver />
    </div>
  )
}
