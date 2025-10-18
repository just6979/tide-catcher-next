import {coordsFromLatLon, ZERO_COORDS} from '@/app/lib/coords'
import {fetchNoaaUrl} from '@/app/lib/noaa'
import {makeStationsError} from '@/app/lib/stationsUtils'
import type {NoaaCoOpsStation, StationsResponse} from '@/app/lib/types'

export async function stationsFromStation(id: string): Promise<StationsResponse> {
  let stationsData = await fetchNoaaUrl(`/mdapi/prod/webapi/stations/${id}.json`)

  if ('errorMsg' in data) {
    return makeStationsError(`${data.errorCode}: ${data.errorMsg}`)
  }

  const stations: NoaaCoOpsStation[] = data['stations']

  if (stations == null || stations.length == 0) {
    return {
      status: 'Error',
      message: `No stations found for ID: ${id}`,
      reqLocation: ZERO_COORDS,
      count: [].length,
      stations: []
    }
  }

  const station = stations[0]
  return {
    status: 'OK',
    message: '',
    reqLocation: ZERO_COORDS,
    count: 1,
    stations: [{
      id: station.id,
      location: coordsFromLatLon(station.lat, station.lng),
      name: station.name,
      eTidesName: station.name,
      tzOffset: Number(station.timezonecorr)
    }]
  }
}
