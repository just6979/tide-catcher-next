'use client'

import {useEffect, useState} from "react";

export default function Stations() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    stations: []
  })

  useEffect(() => {
    fetch("/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading Stations List...</p>
  if (!data) return <p>No Stations List found.</p>

  const noaaStations = data.stations.filter((station: { noaa: string; }) =>
    station.noaa != ''
  )

  return (
    <div id="stations">
      <h2>Stations</h2>
      <p>
        {noaaStations.length} stations available.
      </p>
      <ul>
        {noaaStations.map((station) => (
          <li key={station["id"]}>
            <a href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station["id"]}`} target="_blank">
              {station["id"]}
            </a> {station["name"]}
          </li>
        ))}
      </ul>
    </div>
  )
}
