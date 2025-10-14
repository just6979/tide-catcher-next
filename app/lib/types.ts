export interface Coords {
  lat: number
  lon: number
}

export interface Station {
  id: string
  location: Coords
  name: string
  eTidesName: string
  tzOffset: number
}

export interface Tide {
  sourceDate: string
  date: string
  day: string
  height: number
  isoDate: string
  time: string
  type: string
}

export interface StationsResponse {
  status: string
  message: string
  reqLocation: Coords
  count: number
  stations: Station[]
}

export interface TidesResponse {
  status: string
  message: string
  reqLocation: Coords
  reqTimestamp: string
  station: Station
  tides: Tide[]
}
