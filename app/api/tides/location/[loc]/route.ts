import { EMPTY_STATION } from "@/app/_lib/constants"
import { coordsFromString } from "@/app/_lib/coords"
import { tidesFromCoords } from "@/app/_lib/tides"
import type { TidesResponse } from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"
import type { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ loc: string }> },
) {
  const utcDate = new UTCDate()
  const { loc } = await params

  const tzOffset = request.nextUrl.searchParams.get("tzOffset") || undefined

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
