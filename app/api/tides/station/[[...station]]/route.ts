import {tidesFromStation} from '@/app/lib/tidesFromStation'

export async function GET(request: Request, {params}: { params: Promise<{ station?: string[] | undefined }> }) {
  const {station} = await params
  const stationId = station && station.length > 0 ? station[0] : '8441241'

  const responseData = await tidesFromStation(stationId)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
