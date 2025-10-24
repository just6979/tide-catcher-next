import { defaultStation } from "@/app/_lib/constants"
import { stationsFromStation } from "@/app/_lib/stationsFromStation"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id?: string[] | undefined }> },
) {
  const { id } = await params
  const stationId = id && id.length > 0 ? id[0] : defaultStation

  const responseData = await stationsFromStation(stationId)

  return Response.json(responseData)
}
