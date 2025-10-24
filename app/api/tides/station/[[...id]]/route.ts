import { defaultStation } from "@/app/_lib/constants"
import { tidesFromStation } from "@/app/_lib/tides"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id?: string[] | undefined }> },
) {
  const { id } = await params
  const stationId = id && id.length > 0 ? id[0] : defaultStation

  const headersList = request.headers
  const tzOffset = headersList.get("X-Tidecatcher-Tz-Offset") || undefined

  const responseData = await tidesFromStation(stationId, tzOffset)

  return Response.json(responseData)
}
