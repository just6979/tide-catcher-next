import {processTides} from '@/app/lib/processTides'
import {stationFromId} from '@/app/lib/stationFromId'

import {TidesResponse} from '@/app/lib/types'
import {ZERO_COORDS} from '@/app/lib/Coords'

export async function tidesFromStation(stationId: string): Promise<TidesResponse> {
  const nowDate = new Date()
  const stationData = await stationFromId(stationId)

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

  const outData = await processTides(station, nowDate)
  return {
    ...outData,
    reqLocation: ZERO_COORDS
  }
}
