import ErrorMsg from "@/app/_components/ErrorMsg"
import TidesFromLocationElement from "@/app/_components/TidesFromLocationElement"
import { GEOLOCATION_ERRORS, GEOLOCATION_OPTIONS } from "@/app/_lib/constants"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function TidesFromGeolocation() {
  const [isLocating, setLocating] = useState(true)
  const [location, setLocation] = useState("")
  const [locationError, setLocationError] = useState("")
  const router = useRouter()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = `${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`
        setLocation(loc)
        setLocating(false)
      },
      (error) => {
        console.warn(
          `error getting location: ${GEOLOCATION_ERRORS[error.code]}`,
        )
        setLocationError(GEOLOCATION_ERRORS[error.code])
        setLocating(false)
      },
      GEOLOCATION_OPTIONS,
    )
  }, [])

  useEffect(() => {
    router.replace(`/tides/location/${location}`)
  }, [location, router])

  if (isLocating) {
    return <p>Getting your location...</p>
  }
  if (locationError != "") {
    return <ErrorMsg msg={`Cannot determine location: ${locationError}`} />
  }

  return <TidesFromLocationElement location={location} />
}
