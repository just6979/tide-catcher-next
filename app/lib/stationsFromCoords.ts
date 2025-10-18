import {coordsFromLatLon, coordsToString} from '@/app/lib/coords'
import {checkNoaaError, fetchNoaaUrl} from '@/app/lib/noaa'
import {makeStationsError} from '@/app/lib/stationsProcessing'
import type {Coords, NoaaTidePredStation, Station, StationsResponse} from '@/app/lib/types'

export async function stationsFromCoords(location: Coords, count = Infinity, initialRange = 10): Promise<StationsResponse> {
  let range = initialRange / 2
  let attempts = 5

  do {
    range *= 2
    attempts -= 1

    let stationsData = await fetchNoaaUrl(
      `/mdapi/prod/webapi/tidepredstations.json?lat=${(location.lat)}&lon=${(location.lon)}&range=${range}`
    )

    const error = checkNoaaError(stationsData)
    if (error) return makeStationsError(error)

    const stations = stationsData['stationList']
    if (stations != null) {
      const stationsSlice = stations.slice(0, Math.min(count, stations.length))
      const stationsOut: Station[] = stationsSlice.map((station: NoaaTidePredStation): Station => {
        return {
          id: station.stationId,
          location: coordsFromLatLon(station.lat, station.lon),
          name: station.stationName,
          eTidesName: station.etidesStnName,
          tzOffset: Number(station.timeZoneCorr)
        }
      })
      return {
        status: 'OK',
        message: '',
        reqLocation: location,
        count: stationsOut.length,
        stations: stationsOut
      }
    }
  } while (attempts > 0)

  // no stations found after maxing out the range
  return makeStationsError(`No stations found within ${range} miles of location (${coordsToString(location)}).`, location)
}
