import {defaultStation} from '@/app/lib/constants'
import {stationsFromStation} from '@/app/lib/stationsFromStation'

export async function GET(request: Request, {params}: { params: Promise<{ station?: string[] | undefined }> }) {
  const {station} = await params
  const stationId = station && station.length > 0 ? station[0] : defaultStation

  const responseData = await stationsFromStation(stationId)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'}
  })
}
