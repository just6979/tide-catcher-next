import stationsFromLocation from '@/app/lib/stationsFromLocation'
import tidesFromStation from '@/app/lib/tidesFromStation'

export default async function tidesFromLocation(location: string) {

  const nearbyData = await stationsFromLocation(location)

  if ('error' in nearbyData) {
    return nearbyData
  }

  const stations = nearbyData['stations']
  const station = stations[0]
  const stationId = station['id']

  const outData = await tidesFromStation(stationId)

  return {
    ...outData,
    reqLocation: location
  }
}
