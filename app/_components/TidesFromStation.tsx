"use client"

import AlertMsg from "@/app/_components/AlertMsg"
import ErrorMsg from "@/app/_components/ErrorMsg"
import TidesTable from "@/app/_components/TidesTable"
import { EMPTY_TIDES_RESPONSE } from "@/app/_lib/constants"
import type { TidesResponse } from "@/app/_lib/types"
import { useEffect, useMemo, useState } from "react"

export default function TidesFromStation(props: {
  id: string
}): React.JSX.Element {
  const stationId = props.id
  const nowDate = useMemo(() => new Date(), [])

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(EMPTY_TIDES_RESPONSE)

  useEffect(() => {
    const tzOffset = nowDate.getTimezoneOffset() * -1
    fetch(`/api/tides/station/${stationId}?${tzOffset}`)
      .then((res) => res.json())
      .then((data: TidesResponse) => {
        setData(data)
        setIsLoading(false)
      })
  }, [nowDate, stationId])

  if (isLoading) {
    return <p>Loading Tides from Station {stationId}...</p>
  }
  if (data.tides.length === 0) {
    return <AlertMsg msg={`No Tides found for Station ${stationId}.`} />
  }
  if (data.status.code != 200) {
    return <ErrorMsg msg={`Error: ${data.status.code}: ${data.status.msg}`} />
  }

  return <TidesTable data={data} nowDate={nowDate} />
}
