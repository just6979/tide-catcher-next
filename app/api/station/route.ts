import {stationById} from "@/app/lib/stationById"

export async function GET() {
  const station_id = '8441241'
  const response_data = await stationById(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}