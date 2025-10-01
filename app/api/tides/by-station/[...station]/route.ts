import tidesByStation from "@/app/lib/tidesByStation";

export async function GET(request: Request, {params}: { params: Promise<{ station_id: string }> }) {
  const station_id = (await params).station_id
  const response_data = await tidesByStation(station_id)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
