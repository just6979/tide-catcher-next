import { defaultLocation } from "@/app/lib/constants"
import { coordsFromString } from "@/app/lib/coords"
import { stationsFromCoords } from "@/app/lib/stationsFromCoords"
import { StationsResponse } from "@/app/lib/types"
import { UTCDate } from "@date-fns/utc"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ loc?: string[] | undefined }> },
) {
  const { loc } = await params
  const location = loc && loc.length > 0 ? loc[0] : defaultLocation

  let responseData: StationsResponse
  const coords = coordsFromString(location)
  if (!coords) {
    responseData = {
      status: {
        code: 404,
        msg: `Invalid location: ${location}`,
      },
      reqTimestamp: new UTCDate().toISOString(),
      count: 0,
      stations: [],
    }
  } else {
    responseData = await stationsFromCoords(coords, 10)
  }

  return Response.json(responseData)
}
