export class Coords {
  lat: number
  lon: number

  constructor(lat: number = 0, lon: number = 0) {
    this.lat = lat
    this.lon = lon
  }

  fromLocationString(location: string) {
    return this.fromLatLongStringArray(location.split(','))
  }

  fromLatLongStringArray(location: string[]) {
    return this.fromLatLongStrings(location[0], location[1])
  }

  fromLatLongStrings(lat: string, lon: string) {
    this.lat = Number(lat)
    this.lon = Number(lon)
    return this
  }

  toString() {
    return `${this.lat},${this.lon}`
  }
}

export interface NoaaTidePredStation {
  stationId: string
  lat: number
  lon: number
  stationName: string
  etidesStnName: string
  timeZoneCorr: number
}

export interface NoaaStationById {
  id: string
  lat: number
  lng: number
  name: string
  timezonecorr: number
}

export interface Station {
  id: string
  location: Coords
  name: string
  eTidesName: string
  tzOffset: number
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
  reqLocation: Coords
  count: number,
  stations: Station[]
}

export interface TidesResponse {
  status: string,
  message: string,
  reqLocation: Coords
  reqTimestamp: string,
  station: Station,
  tides: Tide[]
}
