'use client'

import {useEffect, useState} from "react";

export default function Stations() {
  const [isLoading, setIsLoading] = useState(true)
  const [stationsData, setStationsData] = useState({
    stations: []
  })

  useEffect(() => {
    fetch("/api/stations")
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
        {stations.length} stations available.
      </p>
      <ul>
        {stations.map((station) => (
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
