import nearby from "@/app/lib/stations/nearby"
import by_station from "@/app/lib/tides/by_station";

export default async function by_location(location: string) {
  const nearby_data = await nearby(location)
  if ('error' in nearby_data) {
    return nearby_data
  }

  const station_id = nearby_data['station_id']
  return await by_station(station_id)
}
