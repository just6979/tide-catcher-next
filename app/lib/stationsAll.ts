import {coordsFromLatLon, ZERO_COORDS} from '@/app/lib/coords'
import {buildNoaaUrl, fetchNoaaUrl} from '@/app/lib/noaa'
import {makeStationsError} from '@/app/lib/stationsUtils'
import {check, initStorage, read, write} from '@/app/lib/storage'
import type {NoaaTidePredStation, Station, StationsResponse} from '@/app/lib/types'

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

  const path = '/mdapi/prod/webapi/tidepredstations.json'
  console.log(`${__filename}: Fetching new stations.json from ${buildNoaaUrl(path)}`)
  const data = await fetchNoaaUrl(path)

  if ('errorMsg' in data) {
    return makeStationsError(`${data.errorCode}: ${data.errorMsg}`)
  }

  const stationList: NoaaTidePredStation[] = data['stationList']

  if (stationList == null) {
    return makeStationsError('No stations found.')
  }

  const stations: Station[] = stationList.map((station: NoaaTidePredStation): Station => {
    return {
      id: station.stationId,
      location: coordsFromLatLon(station.lat, station.lon),
      name: station.stationName,
      eTidesName: station.etidesStnName,
      tzOffset: Number(station.timeZoneCorr)
    }
  })

  const response = {
    status: 'OK',
    message: '',
    reqLocation: ZERO_COORDS,
    count: stations.length,
    stations: stations
  }
  await write('stations.json', JSON.stringify(response))
  return response
}
