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
  commonName: string
  fullName: string
  etidesName: string
  state: string
  region: string
  tzOffset: number
  distance?: number
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

export interface SqlStation {
  id: string
  name: string
  lat: number
  lon: number
  commonName: string
  fullName: string
  etidesName: string
  state: string
  region: string
  tzOffset: number
  distance?: number
}

export interface NoaaTidePredStation {
  stationId: string
  stationName: string
  lat: number
  lon: number
  commonName: string
  stationFullName: string
  etidesStnName: string
  state: string
  region: string
  timeZoneCorr: string
  distance: number
}

export interface NoaaCoOpsStation {
  id: string
  lat: number
  lng: number
  name: string
  state: string
  timezonecorr: number
}

export interface NoaaTidePrediction {
  t: string
  v: string
  type: string
}
