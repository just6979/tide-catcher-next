import {UTCDate} from '@date-fns/utc'

import {ZERO_COORDS} from '@/app/lib/coords'
import tidesProcessing from '@/app/lib/tidesProcessing'
import {stationsFromCoords} from '@/app/lib/stationsFromCoords'
import type {Coords, TidesResponse} from '@/app/lib/types'

export async function tidesFromCoords(location: Coords, tzOffset?: string): Promise<TidesResponse> {
  const utcNow = new UTCDate()

  const nearbyData = await stationsFromCoords(location, 1)

  if (nearbyData.status !== 'OK') {
    return {
      status: nearbyData.status,
      message: `Error calling NOAA API: ${nearbyData.message}`,
      reqLocation: location,
      reqTimestamp: utcNow.toISOString(),
      station: {
        location: ZERO_COORDS,
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

  return await tidesProcessing(station, utcNow, location, tzOffset)
}
