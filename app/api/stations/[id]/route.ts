import { getAllStationIDs, stationsById } from "@/app/_lib/stationsLocal"

export async function generateStaticParams() {
  return getAllStationIDs().map((stationId) => {
    return { id: stationId }
  })
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  return Response.json(await stationsById(id))
}
