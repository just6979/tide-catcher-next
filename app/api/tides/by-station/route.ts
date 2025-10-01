import tides_by_station from "@/app/lib/tides_by_station"

export async function GET() {
  const station_id = '8441241'; /* Plum Island South */
  const response_data = await tides_by_station(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
