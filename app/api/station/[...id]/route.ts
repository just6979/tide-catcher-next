import {stationFromId} from "@/app/lib/stationFromId"

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
  const stationId = (await params).id
  const responseData = await stationFromId(stationId)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}