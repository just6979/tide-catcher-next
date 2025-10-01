import tidesFromStation from "@/app/lib/tidesFromStation"

export async function GET() {
  const stationId = '8441241' /* Plum Island South */
  const responseData = await tidesFromStation(stationId)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
