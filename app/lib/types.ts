export type Coords = {
  lat: number
  lon: number
}

export type Status = {
  code: string | number
  msg: string | undefined
}

export type Station = {
  id: string
  location: Coords
  name: string
  eTidesName: string
  tzOffset: number
}

export type Tide = {
  sourceDate: string
  isoDate: string
  localDate: string
  date: string
  day: string
  height: number
  time: string
  type: string
}

export type StationsResponse = {
  status: Status
  reqLocation: Coords
  count: number
  stations: Station[]
}

export type TidesResponse = {
  status: Status
  reqLocation: Coords
  reqTimestamp: string
  station: Station
  tides: Tide[]
}

export type NoaaTidePredStation = {
  stationId: string
  lat: number
  lon: number
  stationName: string
  etidesStnName: string
  timeZoneCorr: number
}

export type NoaaCoOpsStation = {
  id: string
  lat: number
  lng: number
  name: string
  timezonecorr: number
}

export type NoaaTidePrediction = {
  t: string
  v: string
  type: string
}
