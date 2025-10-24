"use client"

import { GEOLOCATION_ERRORS } from "@/app/_lib/constants"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function TidesChooser() {
  const router = useRouter()
  const [gpsLocated, setGpsLocated] = useState(false)
  const [gpsLocation, setGpsLocation] = useState("Checking...")
  const [location, setLocation] = useState("42.710,-70.788")
  const [station, setStation] = useState("8441241")

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((perm) => {
        if (perm.state === "granted") {
          setGpsLocation("Pre-locating...")
          getGeoLocation()
        } else if (perm.state === "prompt") {
          setGpsLocation("Can't pre-locate. Hit Go!")
        }
      })
      .catch((reason) => {
        setGpsLocation("Not supported")
        console.log(reason)
      })
  }, [])

  return (
    <div id="mode-selector">
      <p>
        <strong>
          How would you like
          <br />
          to get your tides?
        </strong>
      </p>
      <p>
        Nearby:&nbsp;
        <input
          id="gps-location"
          name="location"
          placeholder={gpsLocation}
          readOnly
          onKeyDown={(event) => {
            if (event.key === "Enter") goToGps()
          }}
        />
        <button onClick={() => goToGps()}>Go</button>
      </p>

      <p>
        <span>Location:&nbsp;</span>
        <span>
          <input
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onFocus={(event) => {
              event.target.select()
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") goToLocation()
            }}
          />
          <button onClick={() => goToLocation()}>Go</button>
        </span>
      </p>

      <p>
        Station:&nbsp;
        <input
          name="station"
          value={station}
          onChange={(event) => setStation(event.target.value)}
          onFocus={(event) => {
            event.target.select()
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") goToStation()
          }}
        />
        <button onClick={() => goToStation()}>Go</button>
      </p>
    </div>
  )

  function getGeoLocation(): void {
    console.log("getting location")
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`
        setGpsLocation(loc)
        setGpsLocated(true)
        console.log(`found location: [${loc}]`)
      },
      (error) => {
        console.log(`error getting location: ${GEOLOCATION_ERRORS[error.code]}`)
        setGpsLocation("Unable to get location")
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 5000,
      },
    )
  }

  function goToGps(): void {
    router.push(`/tides/location/${gpsLocated ? gpsLocation : "gps"}`)
  }

  function goToLocation(): void {
    router.push(`/tides/location/${location}`)
  }

  function goToStation(): void {
    router.push(`/tides/station/${station}`)
  }
}
