import {Coords, Station, StationById, StationsResponse, TidePredStation} from '@/app/lib/types'

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
  stationsIn: TidePredStation[], count = Infinity, location = new Coords()
): StationsResponse {
  if (stationsIn == null) {
    return makeStationsResponse([], location)
  }

  const stationsOut: Station[] = []
  for (let i = 0; i < Math.min(count, stationsIn.length); i++) {
    const station = stationsIn[i]
    stationsOut.push(makeStation(
      station['stationId'],
      new Coords(station.lat, station.lon),
      station['stationName'],
      station['etidesStnName'],
      station['timeZoneCorr']
    ))
  }
  return makeStationsResponse(stationsOut, location)
}

export function processStationsById(
  stations: StationById[]
): StationsResponse {
  if (stations == null) {
    return makeStationsResponse([])
  }
  const station = stations[0]
  return makeStationsResponse([makeStation(
    station['id'],
    new Coords(station.lat, station.lng),
    station['name'],
    station['name'],
    station['timezonecorr']
  )])
}
