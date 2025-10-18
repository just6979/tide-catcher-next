import {UTCDate} from '@date-fns/utc'

import {stationsFromCoords} from '@/app/lib/stationsFromCoords'
import {checkStationsResponse} from '@/app/lib/tidesProcessing'
import type {Coords, TidesResponse} from '@/app/lib/types'

export async function tidesFromCoords(location: Coords, tzOffset?: string): Promise<TidesResponse> {
  const stationData = await stationsFromCoords(location, 1)
  return await checkStationsResponse(stationData, new UTCDate(), location, tzOffset)
}
