import { DEFAULT_COORDS } from "@/app/_lib/constants"
import { stationsTidePred } from "@/app/_lib/stationsTidePred"

export const dynamic = "force-static"

export async function GET() {
  return Response.json(await stationsTidePred(DEFAULT_COORDS))
}
