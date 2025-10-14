export interface Station {
  id: string
  location: string
  name: string
  eTidesName: string
  tzOffset: number
}

export interface TidePredStation {
  stationId: string
  lat: number
  lon: number
  stationName: string
  etidesStnName: string
  timeZoneCorr: number
}

export interface StationById {
  id: string
  lat: number
  lng: number
  name: string
  timezonecorr: number
}

export interface Tide {
  sourceDate: string,
  date: string
  day: string,
  height: number,
  isoDate: string,
  time: string,
  type: string
}

export interface StationsResponse {
  status: string,
  message: string,
  reqLocation: string,
  count: number,
  stations: Station[]
}

export interface TidesResponse {
  status: string,
  message: string,
  reqLocation: string,
  reqTimestamp: string,
  stationLocation: string,
  stationId: string,
  stationName: string,
  stationTzOffset: number,
  tides: Tide[]
}
