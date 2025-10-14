'use client'

import type {Station, StationsResponse} from '@/app/lib/types'
import {useParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import {coordsToString, ZERO_COORDS} from '@/app/lib/coords'

export default function StationFromStation() {
  const {station} = useParams<{ station: string }>()
  const stationId = station && station.length > 0 ? station[0] : ''

  const initialStationsData: StationsResponse = {
    status: '',
    message: '',
    reqLocation: ZERO_COORDS,
    count: 0,
    stations: []
  }

  const [isLoading, setIsLoading] = useState(true)
  const [stationsData, setStationsData] = useState(initialStationsData)

  useEffect(() => {
    fetch(`/api/station/${stationId}`)
      .then((res) => res.json())
      .then((data: StationsResponse) => {
        setStationsData(data)
        setIsLoading(false)
      })
  }, [stationId])

  if (isLoading) return <p>Loading Station Info...</p>
  if (stationsData.status != 'OK') return <p>Error: {stationsData.message}</p>

  const stationItem: Station = stationsData['stations'][0]

  return (
    <table className="request-info single-station">
      <caption>{stationItem.name}</caption>
      <tbody>
      <tr>
        <td>Tides <a href="/stations">Station</a></td>
        <td><a
          href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${(stationItem.id)}`}
          target="_blank">{stationItem.id}
        </a>
        </td>
      </tr>
      <tr>
        <td>Tides Location</td>
        <td>[<a
          href={`https://www.google.com/maps/place/${coordsToString(stationItem.location)}/@${coordsToString(stationItem.location)},12z`}
          target="_blank">{coordsToString(stationItem.location)}
        </a>]
        </td>
      </tr>
      <tr>
        <td>Tides TZ Offset</td>
        <td>{stationItem.tzOffset}</td>
      </tr>
      </tbody>
    </table>
  )
}
