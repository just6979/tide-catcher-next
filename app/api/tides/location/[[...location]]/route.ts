import {coordsFromString} from '@/app/lib/Coords'
import {tidesFromLocation} from '@/app/lib/tidesFromLocation'

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const {location} = await params
  const reqLocation = location && location.length > 0 ? location[0] : '42.71014,-70.78861' /* Plum Island South */

  const responseData = await tidesFromLocation(coordsFromString(reqLocation))

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
