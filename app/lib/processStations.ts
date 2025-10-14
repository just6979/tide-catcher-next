import {NoaaStationById, NoaaTidePredStation, Station, StationsResponse} from '@/app/lib/types'
import Coords from '@/app/lib/Coords'

function makeStation(
  id: string, location: Coords, name: string, eTidesName: string, tz: number
): Station {
  return {
    id: id,
    location: location,
    name: name,
    eTidesName: eTidesName,
    tzOffset: Number(tz)
  }
}

export function makeStationsResponse(
  stationsOut: Station[], location = new Coords(), status = 'OK', message = ''
): StationsResponse {
  return {
    status: status,
    message: message,
    reqLocation: location,
    count: stationsOut.length,
    stations: stationsOut
  }
}

export function makeStationsError(
  message: string, location = new Coords()
): StationsResponse {
  return makeStationsResponse([], location, 'Error', message)
}


export function processTidePredStations(
  stations: NoaaTidePredStation[], count = Infinity, location = new Coords()
): StationsResponse {
  if (stations == null) {
    return makeStationsResponse([], location)
  }

  const stationsOut: Station[] = []
  for (let i = 0; i < Math.min(count, stations.length); i++) {
    const station = stations[i]
    stationsOut.push(makeStation(
      station.stationId,
      new Coords(station.lat, station.lon),
      station.stationName,
      station.etidesStnName,
      station.timeZoneCorr
    ))
  }
  return makeStationsResponse(stationsOut, location)
}

export function processStationsById(
  stations: NoaaStationById[]
): StationsResponse {
  if (stations == null) {
    return makeStationsResponse([])
  }
  const station = stations[0]
  return makeStationsResponse([makeStation(
    station.id,
    new Coords(station.lat, station.lng),
    station.name,
    station.name,
    station.timezonecorr
  )])
}
