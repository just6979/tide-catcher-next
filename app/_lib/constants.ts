import type {
  ApiResponse,
  StationsResponse,
  TidesResponse,
} from "@/app/_lib/types"

/* Plum Island South */
export const defaultStation = "8441241"
export const defaultLocation = "42.710,-70.788"

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const GEOLOCATION_ERRORS = [
  "",
  "PERMISSION_DENIED. No location permission granted. Check site settings.",
  "POSITION_UNAVAILABLE: Error acquiring location data. Try again.",
  "TIMEOUTNo location data acquired in the time allotted.",
]

export const EMPTY_STATION = {
  id: "",
  name: "",
  eTidesName: "",
  tzOffset: 0,
}

export const EMPTY_API_RESPONSE: ApiResponse = {
  status: {
    code: 200,
  },
  reqTimestamp: "",
}

export const EMPTY_STATION_RESPONSE: StationsResponse = {
  ...EMPTY_API_RESPONSE,
  count: 0,
  stations: [],
}

export const EMPTY_TIDES_RESPONSE: TidesResponse = {
  ...EMPTY_API_RESPONSE,
  station: EMPTY_STATION,
  tides: [],
}
