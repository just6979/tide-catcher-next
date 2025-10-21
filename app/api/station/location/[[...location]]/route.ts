import {defaultLocation} from '@/app/lib/constants'
import {coordsFromString} from '@/app/lib/coords'
import {stationsFromCoords} from '@/app/lib/stationsFromCoords'
import {StationsResponse} from '@/app/lib/types'
import {UTCDate} from '@date-fns/utc'

export async function GET(request: Request, {params}: { params: Promise<{ location?: string[] | undefined }> }) {
  const {location} = await params
  const reqLocation = location && location.length > 0 ? location[0] : defaultLocation

  let responseData: StationsResponse
  const locationString = coordsFromString(reqLocation)
  if (!locationString) {
    responseData = {
      status: {
        code: 404,
        msg: `Invalid location: ${reqLocation}`
      },
      reqTimestamp: new UTCDate().toISOString(),
      count: 0,
      stations: []
    }
  } else {
    responseData = await stationsFromCoords(locationString, 1)
  }

  return Response.json(responseData)
}
