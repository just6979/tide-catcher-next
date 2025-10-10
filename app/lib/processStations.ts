import {Station, StationById, TidePredStation} from '@/app/lib/types'

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

export function processTidePredStations(stationsIn: TidePredStation[], count: number, reqLocation: string = '0,0') {
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
  return {
    reqLocation: reqLocation,
    count: stationsOut.length,
    stations: stationsOut
  }
}

export function processStationsById(stations: StationById[]) {
  const station = stations[0]
  const stationLocation = `${station['lat']},${station['lng']}`
  return {
    reqLocation: '0,0',
    count: 1,
    stations: [makeStation(
      station['id'],
      stationLocation,
      station['name'],
      station['name'],
      station['timezonecorr']
    )]
  }
}
