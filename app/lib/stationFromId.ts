import {coordsFromLatLon} from '@/app/lib/Coords'
import {makeStation, makeStationsError, makeStationsResponse} from '@/app/lib/processStations'
import type {StationsResponse} from '@/app/lib/types'

interface NoaaStationById {
  id: string
  lat: number
  lng: number
  name: string
  timezonecorr: number
}

export async function stationFromId(id: string): Promise<StationsResponse> {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${id}.json`
  const stationsResponse = await fetch(url, {cache: 'force-cache'})
  const stationsData = await stationsResponse.json()

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
