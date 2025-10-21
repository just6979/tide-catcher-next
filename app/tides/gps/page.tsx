'use client'

import {TidesElement} from '@/app/elements/tidesElement'
import {EMPTY_TIDES_RESPONSE, GEOLOCATION_ERRORS} from '@/app/lib/constants'
import type {TidesResponse} from '@/app/lib/types'
import {useEffect, useState} from 'react'

export default function TidesFromGeolocation() {
  const nowDate = new Date()

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

  return TidesElement(data, nowDate)
}
