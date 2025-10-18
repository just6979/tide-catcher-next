import {coordsFromLatLon} from '@/app/lib/coords'
import {checkNoaaError, fetchNoaaUrl} from '@/app/lib/noaa'
import {makeStation, makeStationsError, makeStationsResponse} from '@/app/lib/stationsProcessing'
import type {StationsResponse} from '@/app/lib/types'

interface NoaaStationById {
  id: string
  lat: number
  lng: number
  name: string
  timezonecorr: number
}

export async function stationsFromStation(id: string): Promise<StationsResponse> {
  let stationsData = await fetchNoaaUrl(`/mdapi/prod/webapi/stations/${id}.json`)

  const error = checkNoaaError(stationsData)
  if (error) return makeStationsError(error)

  const stations = stationsData['stations']

  if (stations == null) {
    return makeStationsError(`No stations found for ID: ${id}`)
  }

  const station: NoaaStationById = stations[0]
  const stationOut = makeStation(
    station.id,
    coordsFromLatLon(station.lat, station.lng),
    station.name,
    station.name,
    station.timezonecorr
  )
  const stationsOut = [stationOut]
  return makeStationsResponse(stationsOut)
}
