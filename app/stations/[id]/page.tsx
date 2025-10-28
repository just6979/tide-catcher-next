import StationTableElement from "@/app/_components/StationTableElement"
import { DEFAULT_STATION } from "@/app/_lib/constants"
import { stationsById } from "@/app/_lib/stationsLocal"
import type { Station } from "@/app/_lib/types"

export async function generateStaticParams() {
  return [{ id: DEFAULT_STATION }]
}

export default async function StationFromStation({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await stationsById(id)
  if (!data || !("stations" in data) || !(data.stations.length > 0)) {
    return <p>No Station with ID {id} found.</p>
  }
  const station: Station = data.stations[0]
  return <StationTableElement station={station} />
}
