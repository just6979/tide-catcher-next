import {
  DEFAULT_TIDEPRED_COUNT,
  DEFAULT_TIDEPRED_RANGE,
  MAX_TIDEPRED_RANGE,
} from "@/app/_lib/constants"
import { coordsFromString } from "@/app/_lib/coords"
import { stationsTidePred } from "@/app/_lib/stationsTidePred"
import { UTCDate } from "@date-fns/utc"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ loc: string }> },
) {
  const { loc } = await params
  const coords = coordsFromString(loc)

  if (!coords) {
    return Response.json({
      status: {
        code: 404,
        msg: `Invalid location: ${loc}`,
      },
      reqTimestamp: new UTCDate().toISOString(),
      count: 0,
      stations: [],
    })
  }

  const countParam = request.nextUrl.searchParams.get("count")
  let count = !countParam ? DEFAULT_TIDEPRED_COUNT : Number(countParam)
  count = isNaN(count) ? DEFAULT_TIDEPRED_COUNT : count

  const rangeParam = request.nextUrl.searchParams.get("range")
  let range = !rangeParam ? DEFAULT_TIDEPRED_RANGE : Number(rangeParam)
  range = isNaN(range) ? DEFAULT_TIDEPRED_RANGE : range
  range = Math.min(range, MAX_TIDEPRED_RANGE)

  return Response.json(await stationsTidePred(coords, count, range))
}
