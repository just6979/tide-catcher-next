'use client'

import {useEffect, useState} from "react";

export default function Stations() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})

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

  let noaaStations = data.stations.filter(station =>
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
          <li key={station.id}>
            {StationLink(station.noaa, station.org_id)} {station.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StationLink(isNoaa: boolean, org_id: string) {
  if (isNoaa) {
    return <>
      <a href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${org_id}`} target="_blank">NOAA {org_id}</a>
    </>

  } else {
    return <>{org_id}</>
  }
}