'use client'

import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function Stations() {
  const isRefreshed = useSearchParams().has('refreshed')

  const [isLoading, setIsLoading] = useState(true)
  const [stationsData, setStationsData] = useState({
    count: 0,
    stations: []
  })

  useEffect(() => {
    fetch('/api/stations')
      .then((res) => res.json())
      .then((data) => {
        setStationsData(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading Stations List...</p>
  if (!stationsData) return <p>No Stations List found.</p>

  const stations = stationsData.stations

  return (
    <div id="stations">
      <h2>Stations</h2>
      <p>
        {stationsData['count']} stations available <span id="refresh">
        (<Link href="/stations/refresh" replace>{isRefreshed ? 'Refresh Again' : 'Refresh'}</Link>)
      </span>
      </p>
      <ul>
        {stations.map((station) => (
          <li key={station['id']}>
            <a href={`https://www.google.com/maps/place/${station['location']}/@${station['location']},12z`}
               target="_blank">{station['name']}
            </a> | <a
            href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station['id']}`}
            target="_blank">{station['id']}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
