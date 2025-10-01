import nearby from "@/app/lib/stations/nearby"
import by_station from "@/app/lib/tides/by_station";

export default async function by_location(location: string) {
  const station_id = await nearby(location)
  if (station_id == null) {
    return {
      'error': `No station found near location (${location}).`
    }
  }
  return await by_station(station_id)
}
