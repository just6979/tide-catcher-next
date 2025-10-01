import {stationFromId} from "@/app/lib/stationFromId"

export async function GET() {
  const stationId = '8441241'
  const responseData = await stationFromId(stationId)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}