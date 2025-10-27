import { stationsAll } from "@/app/_lib/stationsAll"

export async function GET() {
  return Response.json(stationsAll())
}
