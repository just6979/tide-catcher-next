import { stationsById } from "@/app/_lib/stationsLocal"

export async function GET() {
  return Response.json(await stationsById())
}
