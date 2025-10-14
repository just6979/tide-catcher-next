import {makeStationsError, processTidePredStations} from '@/app/lib/processStations'

import {StationsResponse} from '@/app/lib/types'
import Coords from '@/app/lib/Coords'

export async function stationsFromLocation(location: Coords, count = Infinity, initialRange = 10): Promise<StationsResponse> {
  let range = initialRange / 2
  let attempts = 5

  do {
    range *= 2
    attempts -= 1
    const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json?` +
      `lat=${(location.lat)}&lon=${(location.lon)}&range=${range}`
    const stationsResponse = await fetch(url, {cache: 'force-cache'})
    const stationsData = await stationsResponse.json()

    const stations = stationsData['stationList']
    if (stations != null) {
      return processTidePredStations(stations, count, location)
    }

  } while (attempts > 0)

  // no stations found after maxing out the range
  return makeStationsError(`No stations found within ${range} miles of location (${location}).`, location)
}
