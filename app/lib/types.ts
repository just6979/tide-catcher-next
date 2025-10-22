export interface Coords {
  lat: number
  lon: number
}

export interface Status {
  code: number
  msg?: string
}

export interface Station {
  id: string
  location?: Coords
  name: string
  eTidesName: string
  tzOffset: number
}

export interface Tide {
  sourceDate: string
  isoDate: string
  localDate: string
  date: string
  day: string
  height: number
  time: string
  type: string
}

export interface ApiResponse {
  status: Status
  reqTimestamp: string
  reqLocation?: Coords
}

export interface StationsResponse extends ApiResponse {
  count: number
  stations: Station[]
}

export interface TidesResponse extends ApiResponse {
  station: Station
  tides: Tide[]
}

export interface NoaaTidePredStation {
  stationId: string
  lat: number
  lon: number
  stationName: string
  etidesStnName: string
  timeZoneCorr: number
}

export interface NoaaCoOpsStation {
  id: string
  lat: number
  lng: number
  name: string
  timezonecorr: number
}

export interface NoaaTidePrediction {
  t: string
  v: string
  type: string
}
