import {makeStationsError, processTidePredStations} from '@/app/lib/processStations'
import {check, initStorage, read, write} from '@/app/lib/storage'

import {StationsResponse} from '@/app/lib/types'

export async function stationsAll(forceFetch = false): Promise<StationsResponse> {
  initStorage()

  if (!forceFetch) {
    console.log(`${__filename}: Checking for cached stations.json`)
    if (await check('stations.json')) {
      try {
        const outData = JSON.parse(await read('stations.json'))
        console.log(`${__filename}: Using cached stations.json`)
        return outData
      } catch (err) {
        console.log(`${__filename}: Unable to parse stations.json: ${err}`)
      }
    }
  }

  if (forceFetch) {
    console.log(`${__filename}: Forcing refresh of stations.json upon request`)
  } else {
    console.log(`${__filename}: Forcing refresh of stations.json because no cache found`)
  }

  const stationsUrl = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json'
  console.log(`${__filename}: Fetching new stations.json from ${stationsUrl}`)

  const stationsResponse = await fetch(stationsUrl)
  const stationsData = await stationsResponse.json()

  const stations = stationsData['stationList']
  if (stations != null) {
    const count = stations.length
    const stationsData = processTidePredStations(stations, count)
    await write('stations.json', JSON.stringify(stationsData))
    return stationsData
  }

  return makeStationsError('No stations found.')
}
