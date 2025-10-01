import stationsNearby from "@/app/lib/stationsNearby"
import tidesByStation from "@/app/lib/tidesByStation";

export default async function tidesByLocation(location: string) {
  const nearbyData = await stationsNearby(location)
  if ('error' in nearbyData) {
    return nearbyData
  }

  const stationId = nearbyData['station_id']
  const outData = await tidesByStation(stationId);

  return {
    ...nearbyData,
    ...outData
  }
}