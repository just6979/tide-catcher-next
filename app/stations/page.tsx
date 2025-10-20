'use client'

import {coordsToString, ZERO_COORDS} from '@/app/lib/coords'
import type {StationsResponse} from '@/app/lib/types'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function StationsAll() {
  const isRefreshed = useSearchParams().has('refreshed')

  const initialStationsData: StationsResponse = {
    status: {
      code: '',
      msg: undefined
    },
    reqLocation: ZERO_COORDS,
    count: 0,
    stations: []
  }

  const [isLoading, setIsLoading] = useState(true)
  const [stationsData, setStationsData] = useState(initialStationsData)

  useEffect(() => {
    fetch('/api/stations')
      .then((res) => res.json())
      .then((data: StationsResponse) => {
        setStationsData(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading Stations List...</p>
  if (!stationsData) return <p>No Stations List found.</p>
  if (stationsData.status.code != 'OK') return <p>Error: {stationsData.status.msg}</p>

  const stations = stationsData.stations

  return (
    <div id="stations">
      <h2>Stations</h2>
      <p>
        {stationsData.count} stations available <span id="refresh">
        (<Link href="/stations/refresh" replace>{isRefreshed ? 'Refresh Again' : 'Refresh'}</Link>)
      </span>
      </p>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            <a
              href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station.id}`}
              target="_blank">
              {station.id}
            </a> | {station.name} | [
            <a
              href={`https://www.google.com/maps/place/${coordsToString(station.location)}/@${coordsToString(station.location)},12z`}
              target="_blank">
              {coordsToString(station.location)}
            </a>]
          </li>
        ))}
      </ul>
    </div>
  )
}
