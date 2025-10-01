import {stationFromId} from "@/app/lib/stationFromId"

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
  const station_id = (await params).id
  const response_data = await stationFromId(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}