"use client"

import { defaultStation, EMPTY_STATION_RESPONSE } from "@/app/_lib/constants"
import { coordsToString } from "@/app/_lib/coords"
import type { Station, StationsResponse } from "@/app/_lib/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function StationFromStation() {
  const { id } = useParams<{ id: string }>()
  const stationId = id && id.length > 0 ? id[0] : defaultStation

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(EMPTY_STATION_RESPONSE)

  useEffect(() => {
    fetch(`/api/station/${stationId}`)
      .then((res) => res.json())
      .then((data: StationsResponse) => {
        setData(data)
        setIsLoading(false)
      })
  }, [stationId])

  if (isLoading) {
    return <p>Loading Station with ID {stationId}...</p>
  }
  if (!data || !("stations" in data) || !(data.stations.length > 0)) {
    return <p>No Station with ID {stationId} found.</p>
  }
  if (data.status.code != 200) {
    return (
      <p>
        Error: {data.status.code}: {data.status.msg}
      </p>
    )
  }

  const stationItem: Station = data.stations[0]
  return (
    <table className="request-info single-station">
      <caption>{stationItem.name}</caption>
      <tbody>
        <tr>
          <td>NOAA ID</td>
          <td>
            <a
              href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${stationItem.id}`}
              target="_blank"
            >
              {stationItem.id}
            </a>
          </td>
        </tr>
        <tr>
          <td>Location</td>
          <td>
            [
            <a
              href={`https://www.google.com/maps/place/${coordsToString(stationItem.location)}/@${coordsToString(stationItem.location)},12z`}
              target="_blank"
            >
              {coordsToString(stationItem.location)}
            </a>
            ]
          </td>
        </tr>
        <tr>
          <td>Common Name</td>
          <td>{stationItem.commonName}</td>
        </tr>
        <tr>
          <td>Full Name</td>
          <td>{stationItem.fullName}</td>
        </tr>
        <tr>
          <td>eTides Name</td>
          <td>{stationItem.etidesName}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{stationItem.state}</td>
        </tr>
        <tr>
          <td>Region</td>
          <td>{stationItem.region}</td>
        </tr>
        <tr>
          <td>Timezone Offset</td>
          <td>{stationItem.tzOffset}</td>
        </tr>
      </tbody>
    </table>
  )
}
