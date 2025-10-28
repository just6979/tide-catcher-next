"use client"

import { EMPTY_STATION_RESPONSE } from "@/app/_lib/constants"
import type { StationsResponse } from "@/app/_lib/types"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function StationsAll() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(EMPTY_STATION_RESPONSE)

  useEffect(() => {
    fetch("/api/stations/all")
      .then((res) => res.json())
      .then((data: StationsResponse) => {
        setData(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p>Loading Stations List...</p>
  }
  if (!data || !("stations" in data) || !(data.stations.length > 0)) {
    return <p>No Stations List found.</p>
  }
  if (data.status.code != 200) {
    return (
      <p>
        Error: {data.status.code}: {data.status.msg}
      </p>
    )
  }

  return (
    <div id="stations">
      <h2>Stations</h2>
      <p>{data.count} stations available </p>
      <ul>
        {data.stations.map((station) => (
          <li key={station.id}>
            <Link href={`/station/${station.id}`}>{station.id}</Link>:{" "}
            {station.name}
            {station.state ? `, ${station.state}` : `, ${station.region}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
