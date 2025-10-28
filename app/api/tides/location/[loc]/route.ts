import { EMPTY_STATION } from "@/app/_lib/constants"
import { coordsFromString } from "@/app/_lib/coords"
import { tidesFromCoords } from "@/app/_lib/tides"
import type { TidesResponse } from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ loc: string }> },
) {
  const utcDate = new UTCDate()
  const { loc } = await params

  const headersList = request.headers
  const tzOffset = headersList.get("X-Tidecatcher-Tz-Offset") || undefined

  let responseData: TidesResponse
  const locationString = coordsFromString(loc)
  if (!locationString) {
    responseData = {
      status: {
        code: 404,
        msg: `Invalid location: ${loc}`,
      },
      reqTimestamp: utcDate.toISOString(),
      station: EMPTY_STATION,
      tides: [],
    }
  } else {
    responseData = await tidesFromCoords(locationString, tzOffset)
  }

  return Response.json(responseData)
}
