import {coordsFromLatLon, ZERO_COORDS} from '@/app/lib/coords'
import {checkNoaaError, fetchNoaaUrl} from '@/app/lib/noaa'
import {makeStation, makeStationsError, makeStationsResponse} from '@/app/lib/stationsProcessing'
import type {Coords, Station, StationsResponse} from '@/app/lib/types'

interface NoaaTidePredStation {
  stationId: string
  lat: number
  lon: number
  stationName: string
  etidesStnName: string
  timeZoneCorr: number
}

export async function stationsFromCoords(location: Coords, count = Infinity, initialRange = 10): Promise<StationsResponse> {
  let range = initialRange / 2
  let attempts = 5

  do {
    range *= 2
    attempts -= 1

    let stationsData = await fetchNoaaUrl(
      `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json?` +
      `lat=${(location.lat)}&lon=${(location.lon)}&range=${range}`
    )

    const error = checkNoaaError(stationsData)
    if (error) return makeStationsError(error)

    const stations = stationsData['stationList']
    if (stations != null) {
      return processTidePredStations(stations, count, location)
    }
  } while (attempts > 0)

  // no stations found after maxing out the range
  return makeStationsError(`No stations found within ${range} miles of location (${location}).`, location)
}

export function processTidePredStations(
  stations: NoaaTidePredStation[], count = Infinity, location = ZERO_COORDS
): StationsResponse {
  if (stations == null) {
    return makeStationsResponse([], location)
  }

  const stationsOut: Station[] = []
  for (let i = 0; i < Math.min(count, stations.length); i++) {
    const station = stations[i]
    stationsOut.push(makeStation(
      station.stationId,
      coordsFromLatLon(station.lat, station.lon),
      station.stationName,
      station.etidesStnName,
      station.timeZoneCorr
    ))
  }
  return makeStationsResponse(stationsOut, location)
}
