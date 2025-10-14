import {ZERO_COORDS} from '@/app/lib/Coords'
import type {Coords, Station, StationsResponse} from '@/app/lib/types'

export function makeStation(
  id: string, location: Coords, name: string, eTidesName: string, tz: number
): Station {
  return {
    id: id,
    location: location,
    name: name,
    eTidesName: eTidesName,
    tzOffset: Number(tz)
  }
}

export function makeStationsResponse(
  stationsOut: Station[], location = ZERO_COORDS, status = 'OK', message = ''
): StationsResponse {
  return {
    status: status,
    message: message,
    reqLocation: location,
    count: stationsOut.length,
    stations: stationsOut
  }
}

export function makeStationsError(
  message: string, location = ZERO_COORDS
): StationsResponse {
  return makeStationsResponse([], location, 'Error', message)
}
