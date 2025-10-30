import {
  DEFAULT_TIDEPRED_COUNT,
  DEFAULT_TIDEPRED_RADIUS,
  MAX_TIDEPRED_RADIUS,
} from "@/app/_lib/constants"
import { coordsFromString } from "@/app/_lib/coords"
import { stationsTidePred } from "@/app/_lib/stationsTidePred"
import { UTCDate } from "@date-fns/utc"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ loc: string }> },
): Promise<Response> {
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

  const radiusParam = request.nextUrl.searchParams.get("radius")
  let radius = !radiusParam ? DEFAULT_TIDEPRED_RADIUS : Number(radiusParam)
  radius = isNaN(radius) ? DEFAULT_TIDEPRED_RADIUS : radius
  radius = Math.min(radius, MAX_TIDEPRED_RADIUS)

  return Response.json(await stationsTidePred(coords, count, radius))
}
