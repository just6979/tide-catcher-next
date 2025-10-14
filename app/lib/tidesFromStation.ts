import {processTides} from '@/app/lib/processTides'
import {stationFromId} from '@/app/lib/stationFromId'

import {Coords, TidesResponse} from '@/app/lib/types'

export async function tidesFromStation(stationId: string): Promise<TidesResponse> {
  const nowDate = new Date()
  const stationData = await stationFromId(stationId)

  if (stationData.status !== 'OK') {
    return {
      status: stationData.status,
      message: `Error calling NOAA API: ${stationData.message}`,
      reqLocation: new Coords(),
      reqTimestamp: nowDate.toISOString(),
      stationLocation: new Coords(),
      stationId: '',
      stationName: '',
      stationTzOffset: 0,
      tides: []
    }
  }

  const stations = stationData['stations']
  const station = stations[0]

  const outData = await processTides(station, nowDate)
  return {
    ...outData,
    reqLocation: new Coords()
  }
}
