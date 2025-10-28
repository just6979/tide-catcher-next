import { DEFAULT_LOCATION } from "@/app/_lib/constants"
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

  const count = request.nextUrl.searchParams.get("count")
  let stationCount = !count ? 1 : Number(count)
  stationCount = isNaN(stationCount) ? 1 : stationCount

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
    responseData = await stationsTidePred(coords, stationCount)
  }

  return Response.json(responseData)
}
