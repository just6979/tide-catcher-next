import stationsFromLocation from '@/app/lib/stationsFromLocation'
import {processTides} from '@/app/lib/tidesFromStation'
import {TidesResponse} from '@/app/lib/types'

export async function tidesFromLocation(location: string): Promise<TidesResponse> {
  const nowDate = new Date()

  const nearbyData = await stationsFromLocation(location)

  if (nearbyData.status !== 'OK') {
    return {
      status: nearbyData.status,
      message: `Error calling NOAA API: ${nearbyData.message}`,
      reqLocation: location,
      reqTimestamp: nowDate.toISOString(),
      stationLocation: '',
      stationId: '',
      stationName: '',
      stationTzOffset: 0,
      tides: []
    }
  }

  const stations = nearbyData['stations']
  const station = stations[0]

  const outData = await processTides(station, nowDate)

  return {
    ...outData,
    reqLocation: location
  }
}
