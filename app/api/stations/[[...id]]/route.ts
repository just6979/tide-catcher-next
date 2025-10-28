import { DEFAULT_STATION } from "@/app/_lib/constants"
import { getAllStationIDs, stationsById } from "@/app/_lib/stationsLocal"

export async function generateStaticParams() {
  return getAllStationIDs().map((stationId) => {
    return { id: [stationId] }
  })
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id?: string[] | undefined }> },
) {
  const { id } = await params

  return Response.json(
    await stationsById(id && id.length > 0 ? id[0] : DEFAULT_STATION),
  )
}
