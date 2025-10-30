import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import StationTableElement from "@/app/_components/StationTableElement"
import { DEFAULT_STATION, STATION_ID_REGEX } from "@/app/_lib/constants"

export async function generateStaticParams() {
  return [{ id: DEFAULT_STATION }]
}

export default async function StationFromStation({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (STATION_ID_REGEX.test(id)) {
    return <StationTableElement id={id} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid station ID: ${id}`} />
    </div>
  )
}
