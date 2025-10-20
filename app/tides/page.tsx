'use client'

import {EMPTY_TIDES_RESPONSE, GEOLOCATION_ERRORS} from '@/app/lib/constants'
import {coordsToString} from '@/app/lib/coords'
import {Tide, TidesResponse} from '@/app/lib/types'
import {useEffect, useState} from 'react'

export default function TidesFromLocation() {

  const nowTime = new Date()

  const [isLocating, setLocating] = useState(true)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(EMPTY_TIDES_RESPONSE)

  useEffect(() => {
    console.log('getting location')
    navigator.geolocation.getCurrentPosition(
      position => {
        const loc = `${(position.coords.latitude.toFixed(3))},${(position.coords.longitude.toFixed(3))}`
        setLocation(loc)
        console.log(`found location: [${loc}]`)
        setLocating(false)

      },
      error => {
        console.log('error getting location')
        console.log(GEOLOCATION_ERRORS[error.code])
        setLocationError(GEOLOCATION_ERRORS[error.code])
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
    const now = new Date()
    if (!location) return
    console.log(`getting tides for [${location}]`)
    fetch(`/api/tides/location/${location}`, {
      headers: {
        'X-Tidecatcher-Tz-Offset': (now.getTimezoneOffset() * -1).toString()
      }
    })
      .then((res) => res.json())
      .then((data: TidesResponse) => {
        setData(data)
        setLoading(false)
      })
  }, [location])

  if (isLocating) {
    return <p>Getting your location...</p>
  }
  if (locationError != '') {
    return (<p>
      Error getting location: {locationError}
    </p>)
  }

  if (isLoading) {
    return <p>Loading Tides Data for [{location}]...</p>
  }
  if (!data || !('tides' in data) || !(data.tides.length > 0)) {
    return <p>No Tides Data for [{location}] found.</p>
  }
  if (data.status.code != 200) {
    return <p>Error: ${data.status.code}: {data.status.msg}</p>
  }

  const reqTime = new Date(data.reqTimestamp).toLocaleString()
  return (
    <div>
      <table id="tides">
        <caption>{data.station.name}</caption>
        <tbody>
        {data.tides.map((tide: Tide) => {
          const tideType: string = tide['type']
          const arrow: string = tideType == 'high' ? '⤴' : '⤵'
          const prior = new Date(tide['isoDate']) < nowTime ? 'prior' : 'future'
          return (
            <tr key={tide['isoDate']} className={`${prior} ${tideType}`}>
              <td className="type">{arrow} {tideType.toUpperCase().padEnd(4, '\u00A0')}</td>
              <td className="time">{tide['time']}</td>
              <td className="day">{tide['day']}</td>
              <td className="date">{tide['date']}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <table className="request-info">
        <tbody>
        <tr>
          <td>Request Time</td>
          <td>{reqTime}</td>
        </tr>
        <tr>
          <td>Your Location</td>
          <td>[<a
            href={`https://www.google.com/maps/place/${coordsToString(data.reqLocation)}/@${coordsToString(data.reqLocation)},12z`}
            target="_blank">{coordsToString(data.reqLocation)}
          </a>]
          </td>
        </tr>
        <tr>
          <td>Tides <a href="/stations">Station</a></td>
          <td><a href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${(data.station.id)}`}
                 target="_blank">{data.station.id}</a></td>
        </tr>
        <tr>
          <td>Tides Location</td>
          <td>[<a
            href={`https://www.google.com/maps/place/${coordsToString(data.station.location)}/@${coordsToString(data.station.location)},12z`}
            target="_blank">{coordsToString(data.station.location)}
          </a>]
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
