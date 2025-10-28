import { defaultStation } from "@/app/_lib/constants"
import { stationById } from "@/app/_lib/stationsLocal"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id?: string[] | undefined }> },
) {
  const { id } = await params

  return Response.json(
    await stationById(id && id.length > 0 ? id[0] : defaultStation),
  )
}
