import {ZERO_COORDS} from '@/app/lib/coords'
import type {StationsResponse, Status} from '@/app/lib/types'

export function makeStationsError(status: Status, location = ZERO_COORDS): StationsResponse {
  return {
    status: status,
    reqLocation: location,
    count: 0,
    stations: []
  }
}
