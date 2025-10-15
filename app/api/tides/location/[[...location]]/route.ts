import {coordsFromString} from '@/app/lib/coords'
import {tidesFromCoords} from '@/app/lib/tidesFromCoords'

export async function GET(request: Request, {params}: { params: Promise<{ location?: string[] | undefined }> }) {
  const {location} = await params
  const reqLocation = location && location.length > 0 ? location[0] : '42.71014,-70.78861' /* Plum Island South */

  const headersList = request.headers
  const tzOffset = headersList.get('X-Tidecatcher-Tz-Offset') || undefined

  const responseData = await tidesFromCoords(coordsFromString(reqLocation), tzOffset)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
