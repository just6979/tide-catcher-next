import stations_nearby from "@/app/lib/stations_nearby"
import tides_by_station from "@/app/lib/tides_by_station";

export default async function tides_by_location(location: string) {
  const nearby_data = await stations_nearby(location)
  if ('error' in nearby_data) {
    return nearby_data
  }

  const station_id = nearby_data['station_id']
  const out_data = await tides_by_station(station_id);

  return {
    ...nearby_data,
    ...out_data
  }
}