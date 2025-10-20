import {ZERO_COORDS} from '@/app/lib/coords'
import type {StationsResponse, Status} from '@/app/lib/types'

export function makeStationsError(status: Status, timestamp: Date, location = ZERO_COORDS): StationsResponse {
  return {
    status: status,
    reqTimestamp: timestamp.toISOString(),
    reqLocation: location,
    count: 0,
    stations: []
  }
}
