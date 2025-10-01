import stationsNearby from "@/app/lib/stationsNearby"
import tidesByStation from "@/app/lib/tidesByStation";

export default async function tidesByLocation(location: string) {
  const lat = Number(location.split(',')[0])
  const lon = Number(location.split(',')[1])

  const nearbyData = await stationsNearby(location)
  if ('error' in nearbyData) {
    return nearbyData
  }

  const stations = nearbyData['stations']
  const station = stations[0]
  const stationId = station['id']

  const outData = await tidesByStation(stationId);

  return {
    req_lat: lat,
    req_lon: lon,
    ...outData
  }
}