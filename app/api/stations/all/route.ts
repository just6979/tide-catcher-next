import { stationsById } from "@/app/_lib/stationsLocal"

export async function GET(): Promise<Response> {
  return Response.json(await stationsById())
}
