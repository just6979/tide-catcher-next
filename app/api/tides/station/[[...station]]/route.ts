import {tidesFromStation} from '@/app/lib/tidesFromStation'
import {defaultStation} from '@/app/lib/constants'

export async function GET(request: Request, {params}: { params: Promise<{ station?: string[] | undefined }> }) {
  const {station} = await params
  const stationId = station && station.length > 0 ? station[0] : defaultStation

  const headersList = request.headers
  const tzOffset = headersList.get('X-Tidecatcher-Tz-Offset') || undefined

  const responseData = await tidesFromStation(stationId, tzOffset)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
