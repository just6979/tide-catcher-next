import {stationFromId} from "@/app/lib/stationFromId"

export async function GET() {
  const station_id = '8441241'
  const response_data = await stationFromId(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}