import {Station, StationById, StationsResponse, TidePredStation} from '@/app/lib/types'

function makeStation(
  id: string, location: string, name: string, eTidesName: string, tz: number
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
  stationsOut: Station[], reqLocation = '0,0', status = 'OK', message = ''
): StationsResponse {
  return {
    status: status,
    message: message,
    reqLocation: reqLocation,
    count: stationsOut.length,
    stations: stationsOut
  }
}

export function makeStationsError(
  message: string, reqLocation = '0,0'
): StationsResponse {
  return makeStationsResponse([], 'Error', reqLocation, message)
}

export function processTidePredStations(
  stationsIn: TidePredStation[], count = Infinity, reqLocation = '0,0'
): StationsResponse {
  const stationsOut: Station[] = []
  for (let i = 0; i < Math.min(count, stationsIn.length); i++) {
    const station = stationsIn[i]
    const stationLocation = `${station['lat']},${station['lon']}`
    stationsOut.push(makeStation(
      station['stationId'],
      stationLocation,
      station['stationName'],
      station['etidesStnName'],
      station['timeZoneCorr']
    ))
  }
  return makeStationsResponse(stationsOut, reqLocation)
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
    `${station['lat']},${station['lng']}`,
    station['name'],
    station['name'],
    station['timezonecorr']
  )])

}
