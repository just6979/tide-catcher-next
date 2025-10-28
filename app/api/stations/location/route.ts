import { DEFAULT_LOCATION } from "@/app/_lib/constants"
import { getStationLocationParams } from "@/app/api/stations/location/[loc]/route"
import { redirect, RedirectType } from "next/navigation"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { countParam, count, rangeParam, range } =
    getStationLocationParams(request)

  let params: string = countParam ? `&count=${count}` : ""
  params += rangeParam ? `&range=${range}` : ""

  redirect(`location/${DEFAULT_LOCATION}?${params}`, RedirectType.replace)
}
