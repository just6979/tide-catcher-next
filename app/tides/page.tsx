'use client'

import {useEffect, useState} from 'react'
import {Tide} from '@/app/lib/types'

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
    reqLat: '',
    reqLon: '',
    reqTimestamp: '',
    respLat: 0,
    respLon: 0,
    stationName: '',
    stationId: ''
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
        const errorMap = ['',
          'PERMISSION_DENIED. No location permission granted. Check site settings.',
          'POSITION_UNAVAILABLE: Error acquiring location data. Try again.',
          'TIMEOUTNo location data acquired in the time allotted.'
        ]
        setLocationError(errorMap[error.code])
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
    fetch(`/api/tides/location/${location.latitude},${location.longitude}`)
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

  /* Google Maps URL format is /maps/place/<pinLat>,<pinLon>/@<centerLat>,<centerLon>,<zoomlevel>z */
  const requestLocationUrl =
    `https://www.google.com/maps/place/${data.reqLat},${data.reqLon}/@${data.reqLat},${data.reqLon},12z`
  const responseLocationUrl =
    `https://www.google.com/maps/place/${data.respLat},${data.respLon}/@${data.respLat},${data.respLon},12z`

  const stationUrl = `https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${data.stationId}`
  const reqTime = new Date(data.reqTimestamp).toLocaleString()

  return (
    <div>
      <table id="tides">
        <caption className="top">{data.stationName}</caption>
        <tbody>
        {data.tides.map((tide: Tide) => {
          const tideType: string = tide['type'].toUpperCase()
          const arrow: string = tideType == 'HIGH' ? '\u2B9D' : '\u00A0\u2B9F'
          return (
            <tr key={tide['isoDate']}
                className={(tide['prior'] === 'prior' ? 'prior ' : 'future ') + tideType.toLowerCase()}>
              <td className="type">{tideType} {arrow}</td>
              <td className="time">{tide['time']}</td>
              <td className="day">{tide['day']}</td>
              <td className="date">{tide['date']}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <table id="request-info">
        <tbody>
        <tr>
          <td>Request Time</td>
          <td>{reqTime}</td>
        </tr>
        <tr>
          <td>Request Location</td>
          <td><a href={requestLocationUrl} target="_blank">{data.reqLat},{data.reqLon}</a>
          </td>
        </tr>
        <tr>
          <td>Response Station</td>
          <td><a href={stationUrl} target="_blank">{data.stationName}</a></td>
        </tr>
        <tr>
          <td>Response Location</td>
          <td><a href={responseLocationUrl} target="_blank">{data.respLat},{data.respLon}</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
