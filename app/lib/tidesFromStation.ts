import {ZERO_COORDS} from '@/app/lib/coords'
import {stationsFromStation} from '@/app/lib/stationsFromStation'
import {checkStationsResponse} from '@/app/lib/tidesProcessing'
import type {TidesResponse} from '@/app/lib/types'

export async function tidesFromStation(stationId: string, tzOffset?: string): Promise<TidesResponse> {
  const stationData = await stationsFromStation(stationId)
  return await checkStationsResponse(stationData, new Date(), ZERO_COORDS, tzOffset)
}
