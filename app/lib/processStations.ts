import {Station, StationById, TidePredStation} from '@/app/lib/types'

function makeStation(
  id: string, lat: number, lon: number, name: string, eTidesName: string, tz: number
): Station {
  return {
    id: id,
    lat: Number(lat),
    lon: Number(lon),
    name: name,
    eTidesName: eTidesName,
    tzOffset: Number(tz)
  }
}

export function processTidePredStations(stationsIn: TidePredStation[], count: number, lat = 0, lon = 0) {
  const stationsOut: Station[] = []
  for (let i = 0; i < Math.min(count, stationsIn.length); i++) {
    const station = stationsIn[i];
    stationsOut.push(makeStation(
      station['stationId'],
      station['lat'],
      station['lon'],
      station['stationName'],
      station['etidesStnName'],
      station['timeZoneCorr']
    ))
  }
  return {
    reqLat: lat, reqLng: lon,
    count: stationsOut.length,
    stations: stationsOut
  }
}

export function processStationsById(stations: StationById[]) {
  const station = stations[0]
  return {
    reqLat: 0, reqLng: 0,
    count: 1,
    stations: [makeStation(
      station['id'],
      station['lat'],
      station['lng'],
      station['name'],
      station['name'],
      station['timezonecorr']
    )]
  }
}
