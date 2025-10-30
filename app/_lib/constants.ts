import type { ApiResponse, Station, TidesResponse } from "@/app/_lib/types"

/* Plum Island South */
export const DEFAULT_STATION = "8441241"
/* Plum Island South */
export const DEFAULT_LOCATION = "42.710,-70.788"

export const NOAA_API_BASE_PATH = `https://api.tidesandcurrents.noaa.gov`

export const DEFAULT_TIDEPRED_COUNT = 1
export const DEFAULT_TIDEPRED_RADIUS = 10
// if radius is above this, it reverts to the default of 50
export const MAX_TIDEPRED_RADIUS = 500

export const STATION_ID_REGEX: RegExp = /(?:[A-Z]{3}|\d{3})\d{4}/

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const GEOLOCATION_OPTIONS: PositionOptions = {
  // wait 5 seconds
  timeout: 5000,
  // for a low-accuracy/low-power position
  // (no need for high-acc when we're using 3-sig-fig, aka ~100m, accuracy
  enableHighAccuracy: false,
  // that is less than 1 minute old
  maximumAge: 60000,
}

export const GEOLOCATION_ERRORS = [
  "",
  "PERMISSION_DENIED. No location permission granted. Check site settings.",
  "POSITION_UNAVAILABLE: Error acquiring location data. Try again.",
  "TIMEOUTNo location data acquired in the time allotted.",
]

export const EMPTY_STATION: Station = {
  id: "",
  name: "",
  location: undefined,
  commonName: "",
  fullName: "",
  etidesName: "",
  state: "",
  region: "",
  tzOffset: 0,
  distance: undefined,
}

export const EMPTY_API_RESPONSE: ApiResponse = {
  status: {
    code: 200,
  },
  reqTimestamp: "",
}

export const EMPTY_TIDES_RESPONSE: TidesResponse = {
  ...EMPTY_API_RESPONSE,
  station: EMPTY_STATION,
  tides: [],
}
