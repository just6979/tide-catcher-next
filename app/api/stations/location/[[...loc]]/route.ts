import { DEFAULT_LOCATION, MAX_TIDEPRED_RANGE } from "@/app/_lib/constants"
import { coordsFromString } from "@/app/_lib/coords"
import { stationsTidePred } from "@/app/_lib/stationsTidePred"
import type { StationsResponse } from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ loc?: string[] | undefined }> },
) {
  const { loc } = await params
  const location = loc && loc.length > 0 ? loc[0] : DEFAULT_LOCATION

  const countParam = request.nextUrl.searchParams.get("count")
  let count = !countParam ? 1 : Number(countParam)
  count = isNaN(count) ? 1 : count

  const rangeParam = request.nextUrl.searchParams.get("range")
  let range = !rangeParam ? 10 : Number(rangeParam)
  range = isNaN(range) ? 10 : range
  range = Math.min(range, MAX_TIDEPRED_RANGE)

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
    responseData = await stationsTidePred(coords, count, range)
  }

  return Response.json(responseData)
}
