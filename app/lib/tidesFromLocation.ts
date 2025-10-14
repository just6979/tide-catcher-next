import {processTides} from '@/app/lib/processTides'
import {stationsFromLocation} from '@/app/lib/stationsFromLocation'

import {Coords, TidesResponse} from '@/app/lib/types'

export async function tidesFromLocation(location: Coords): Promise<TidesResponse> {
  const nowDate = new Date()

  const nearbyData = await stationsFromLocation(location, 1)

  if (nearbyData.status !== 'OK') {
    return {
      status: nearbyData.status,
      message: `Error calling NOAA API: ${nearbyData.message}`,
      reqLocation: location,
      reqTimestamp: nowDate.toISOString(),
      station: {
        location: new Coords(),
        id: '',
        name: '',
        eTidesName: '',
        tzOffset: 0
      },
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
