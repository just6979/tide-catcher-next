import {stationById} from "@/app/lib/stationById"

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
  const station_id = (await params).id
  const response_data = await stationById(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}