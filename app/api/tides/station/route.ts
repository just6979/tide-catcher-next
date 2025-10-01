import tidesFromStation from "@/app/lib/tidesFromStation"

export async function GET() {
  const station_id = '8441241' /* Plum Island South */
  const response_data = await tidesFromStation(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
