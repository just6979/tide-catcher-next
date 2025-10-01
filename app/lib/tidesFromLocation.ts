import stationsFromLocation from "@/app/lib/stationsFromLocation"
import tidesFromStation from "@/app/lib/tidesFromStation"

export default async function tidesFromLocation(location: string) {
  const lat = Number(location.split(',')[0])
  const lon = Number(location.split(',')[1])

  const nearbyData = await stationsFromLocation(location)
  if ('error' in nearbyData) {
    return nearbyData
  }

  const stations = nearbyData['stations']
  const station = stations[0]
  const stationId = station['id']

  const outData = await tidesFromStation(stationId)

  return {
    req_lat: lat,
    req_lon: lon,
    ...outData
  }
}