'use client'

import TidesFromLocationElement from '@/app/components/TidesFromLocationElement'
import {GEOLOCATION_ERRORS} from '@/app/lib/constants'
import {useEffect, useState} from 'react'

export default function TidesFromGeolocation() {
  const [isLocating, setLocating] = useState(true)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState('')

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

  if (isLocating) {
    return <p>Getting your location...</p>
  }
  if (locationError != '') {
    return (<p>
      Error getting location: {locationError}
    </p>)
  }

  return <TidesFromLocationElement location={location}/>
}
