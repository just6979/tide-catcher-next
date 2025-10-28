import { stationsAll } from "@/app/_lib/stationsLocal"

export async function GET() {
  return Response.json(stationsAll())
}
