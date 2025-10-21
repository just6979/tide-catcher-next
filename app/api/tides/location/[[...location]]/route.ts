import {defaultLocation, EMPTY_STATION} from '@/app/lib/constants'
import {coordsFromString} from '@/app/lib/coords'
import {tidesFromCoords} from '@/app/lib/tides'
import {TidesResponse} from '@/app/lib/types'
import {UTCDate} from '@date-fns/utc'

export async function GET(request: Request, {params}: { params: Promise<{ location?: string[] | undefined }> }) {
  const utcDate = new UTCDate()
  const {location} = await params
  const reqLocation = location && location.length > 0 ? location[0] : defaultLocation

  const headersList = request.headers
  const tzOffset = headersList.get('X-Tidecatcher-Tz-Offset') || undefined

  let responseData: TidesResponse
  const locationString = coordsFromString(reqLocation)
  if (!locationString) {
    responseData = {
      status: {
        code: 404,
        msg: `Invalid location: ${reqLocation}`
      },
      reqTimestamp: utcDate.toISOString(),
      station: EMPTY_STATION,
      tides: []
    }
  } else {
    responseData = await tidesFromCoords(locationString, tzOffset)
  }

  return Response.json(responseData)
}
