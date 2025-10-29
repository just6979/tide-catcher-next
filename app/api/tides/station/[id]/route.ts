import { EMPTY_STATION, STATION_ID_REGEX } from "@/app/_lib/constants"
import { tidesFromStation } from "@/app/_lib/tides"
import type { TidesResponse } from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"
import type { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const utcDate = new UTCDate()
  const { id } = await params

  let responseData: TidesResponse
  if (!STATION_ID_REGEX.test(id)) {
    responseData = {
      status: {
        code: 404,
        msg: `Invalid Station ID: ${id}`,
      },
      reqTimestamp: utcDate.toISOString(),
      station: EMPTY_STATION,
      tides: [],
    }
  } else {
    responseData = await tidesFromStation(
      id,
      request.nextUrl.searchParams.get("tzOffset") || undefined,
    )
  }

  return Response.json(responseData)
}
