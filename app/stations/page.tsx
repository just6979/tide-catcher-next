import StationTableElement from "@/app/_components/StationTableElement"
import { DEFAULT_STATION } from "@/app/_lib/constants"
import { stationsById } from "@/app/_lib/stationsLocal"

export const dynamic = "force-static"

export default async function StationFromStation() {
  const data = await stationsById(DEFAULT_STATION)
  return <StationTableElement station={data.stations[0]} />
}
