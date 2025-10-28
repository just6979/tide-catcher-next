import { DEFAULT_STATION } from "@/app/_lib/constants"
import { stationsById } from "@/app/_lib/stationsLocal"

export const dynamic = "force-static"

export async function GET() {
  return Response.json(await stationsById(DEFAULT_STATION))
}
