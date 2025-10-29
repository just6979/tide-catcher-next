"use client"

import {
  DEFAULT_LOCATION,
  DEFAULT_STATION,
  GEOLOCATION_ERRORS,
  STATION_ID_REGEX,
} from "@/app/_lib/constants"
import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export default function TidesChooser() {
  const nowDate = useMemo(() => new Date(), [])
  const router = useRouter()
  const [gpsLocated, setGpsLocated] = useState(false)
  const [gpsLocation, setGpsLocation] = useState("Checking...")
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [station, setStation] = useState(DEFAULT_STATION)

  useEffect(() => {
    const prefetchFull = { kind: PrefetchKind.FULL }
    const tzOffset = nowDate.getTimezoneOffset() * -1
    router.prefetch(`/tides/location/gps`, prefetchFull)
    if (gpsLocated) {
      router.prefetch(`/tides/location/${gpsLocation}`, prefetchFull)
      router.prefetch(
        `/api/tides/location/${gpsLocation}?${tzOffset}`,
        prefetchFull,
      )
    }
    if (location.split(",").length === 2) {
      const [lat, lon] = location.split(",")
      if (!isNaN(Number(lat)) && !isNaN(Number(lon))) {
        router.prefetch(`/tides/location/${location}`, prefetchFull)
        router.prefetch(
          `/api/tides/location/${location}?${tzOffset}`,
          prefetchFull,
        )
      }
    }
    if (STATION_ID_REGEX.test(station)) {
      router.prefetch(`/tides/station/${station}`, prefetchFull)
      router.prefetch(`/api/tides/station/${station}?${tzOffset}`, prefetchFull)
    }
  }, [router, gpsLocated, gpsLocation, location, station, nowDate])

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
        setGpsLocation("GPS not supported.")
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
        &nbsp;Nearby&nbsp;
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
        Station&nbsp;
        <input
          name="station"
          placeholder={station}
          onChange={(event) => setStation(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") router.push(`/tides/station/${station}`)
          }}
        />
        <button onClick={() => goToStation()}>Go</button>
      </p>
      <p>
        &nbsp;Coords&nbsp;
        <input
          name="location"
          placeholder={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter")
              router.push(`/tides/location/${location}`)
          }}
        />
        <button onClick={() => goToLocation()}>Go</button>
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
      },
      (error) => {
        console.log(`error getting location: ${GEOLOCATION_ERRORS[error.code]}`)
        setGpsLocation("Can't pre-locate. Hit Go!")
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
