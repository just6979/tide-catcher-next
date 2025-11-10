import { getAllStationIDs, stationsById } from "@/app/_lib/stationsLocal"

export async function generateStaticParams() {
  if (process.env.SKIP_GEN_STATIONS) {
    return [{ id: "8441241" }]
  } else {
    const stations: string[] = getAllStationIDs()
    return stations.map((stationId) => {
      return { id: stationId }
    })
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params
  return Response.json(await stationsById(id))
}
