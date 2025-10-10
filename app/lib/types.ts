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
  prior: string,
  time: string,
  type: string
}
