import by_station from "@/app/lib/tides/by_station";

export async function GET(request: Request, {params}: { params: Promise<{ station_id: string }> }) {
  const station_id = (await params).station_id
  const response_data = await by_station(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
