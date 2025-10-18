import {ZERO_COORDS} from '@/app/lib/coords'
import type {StationsResponse} from '@/app/lib/types'

export function makeStationsError(
  message: string, location = ZERO_COORDS
): StationsResponse {
  return {
    status: 'Error',
    message: message,
    reqLocation: location,
    count: 0,
    stations: []
  }
}
