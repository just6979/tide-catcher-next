import { DEFAULT_COORDS } from "@/app/_lib/constants"
import { tidesFromCoords } from "@/app/_lib/tides"

export async function GET() {
  return Response.json(await tidesFromCoords(DEFAULT_COORDS))
}
