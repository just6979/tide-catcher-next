import { DEFAULT_STATION } from "@/app/_lib/constants"
import { tidesFromStation } from "@/app/_lib/tides"

// export const dynamic = "force-static"

export async function GET() {
  return Response.json(await tidesFromStation(DEFAULT_STATION))
}
