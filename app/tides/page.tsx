'use client'

import {useEffect, useState} from 'react';

export default function Tides() {
  const [isLocating, setLocating] = useState(true)
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  })
  const [locationError, setLocationError] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState({
    tides: [],
    req_lat: '',
    req_lon: '',
    req_timestamp: '',
    resp_lat: 0,
    resp_lon: 0,
    station: ''
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocating(true)
        setLocation({
          latitude: position.coords.latitude.toFixed(5),
          longitude: position.coords.longitude.toFixed(5)
        })
        setLocating(false)

      },
      error => {
        const error_map = ['',
          'PERMISSION_DENIED. No location permission granted. Check site settings.',
          'POSITION_UNAVAILABLE: Error acquiring location data. Try again.',
          'TIMEOUTNo location data acquired in the time allotted.'
        ]
        setLocationError(error_map[error.code])
        setLocating(false)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 5000
      }
    )
  }, [])

  useEffect(() => {
    if (!location.latitude || !location.longitude) return
    fetch(`/api/tides/by-location/${location.latitude},${location.longitude}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [location])

  if (isLocating) return <p>Getting your location...</p>
  if (locationError != '') return (
    <p>
      Error getting location:
      <br/>
      {locationError}
    </p>
  )
  if (isLoading) return <p>Loading Tides Data for ({`${location.latitude},${location.longitude}`})...</p>
  if (!data) return <p>No Tides Data found.</p>

  const request_location_url =
    `https://maps.google.com/maps/place/${data.req_lat},${data.req_lon}/@${data.req_lat},${data.req_lon},12z`
  const response_location_url =
    `https://maps.google.com/maps/place/$data['resp_lat'],$data['resp_lon']/@$data['resp_lat'],$data['resp_lon'],12z`
  const station_url =
    `https://www.google.com/search?q=noaa+$data['station']`

  return (
    <div>
      <table id="tides">
        <caption className="top">{data['station']}</caption>
        <tbody>
        {data.tides.map((tide) => {
          const tideType: string = tide["type"];
          return (
            <tr key={tide["iso_date"]} className={tide['prior'] === "prior" ? "prior" : tideType.toLowerCase()}>
              <td className="type">{tide["type"]}</td>
              <td className="time">{tide["time"]}</td>
              <td className="day">{tide["day"]}</td>
              <td className="date">{tide["date"]}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <table id="request-info">
        <tbody>
        <tr>
          <td>Request Time</td>
          <td>{data.req_timestamp}</td>
        </tr>
        <tr>
          <td>Request Location</td>
          <td><a href={request_location_url} target="_blank">{data.req_lat},{data.req_lon}</a>
          </td>
        </tr>
        <tr>
          <td>Response Station</td>
          <td><a href={station_url} target="_blank">{data.station}</a></td>
        </tr>
        <tr>
          <td>Response Location</td>
          <td><a href={response_location_url} target="_blank">{data.resp_lat},{data.resp_lon}</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
