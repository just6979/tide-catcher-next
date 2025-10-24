import { stationsAll } from "@/app/_lib/stationsAll"

export async function GET() {
  // fetch all stations from NOAA
  const responseData = await stationsAll()

  return Response.json(responseData)
}
