import {ZERO_COORDS} from '@/app/lib/coords'
import tidesProcessing from '@/app/lib/tidesProcessing'
import {stationFromStation} from '@/app/lib/stationFromStation'
import type {TidesResponse} from '@/app/lib/types'

export async function tidesFromStation(stationId: string, tzOffset?: string): Promise<TidesResponse> {
  const nowDate = new Date()
  const stationData = await stationFromStation(stationId)

  if (stationData.status !== 'OK') {
    return {
      status: stationData.status,
      message: `Error calling NOAA API: ${stationData.message}`,
      reqLocation: ZERO_COORDS,
      reqTimestamp: nowDate.toISOString(),
      station: {
        id: '',
        location: ZERO_COORDS,
        name: '',
        eTidesName: '',
        tzOffset: 0
      },
      tides: []
    }
  }

  const stations = stationData['stations']
  const station = stations[0]

  return await tidesProcessing(station, nowDate, ZERO_COORDS, tzOffset)
}
