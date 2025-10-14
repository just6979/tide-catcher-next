import {makeStationsError, processStationsById,} from '@/app/lib/processStations'
import {StationsResponse} from '@/app/lib/types'

export async function stationFromId(id: string): Promise<StationsResponse> {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${id}.json`
  const stationsResponse = await fetch(url, {cache: 'force-cache'})
  const stationsData = await stationsResponse.json()

  const stations = stationsData['stations']
  if (stations != null) {
    return processStationsById(stations)
  }

  return makeStationsError(`No stations found for ID: ${id}`)
}
