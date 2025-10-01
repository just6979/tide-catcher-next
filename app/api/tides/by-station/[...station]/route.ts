import tidesByStation from "@/app/lib/tidesByStation"

export async function GET(request: Request, {params}: { params: Promise<{ station: string }> }) {
  const stationId = (await params).station[0]
  const responseData = await tidesByStation(stationId)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
