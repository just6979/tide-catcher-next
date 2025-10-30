import { stationsById } from "@/app/_lib/stationsLocal"

export const dynamic = "force-static"

export async function GET(): Promise<Response> {
  return Response.json(await stationsById())
}
