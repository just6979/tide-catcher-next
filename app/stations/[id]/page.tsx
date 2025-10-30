import ErrorMsg from "@/app/_components/ErrorMsg"
import StationTable from "@/app/_components/StationTable"
import { DEFAULT_STATION, STATION_ID_REGEX } from "@/app/_lib/constants"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return [{ id: DEFAULT_STATION }]
}

export async function generateMetadata(
  props: PageProps<"/stations/[id]">,
): Promise<Metadata> {
  const { id } = await props.params
  return {
    title: `| Station ${id} Info`,
  }
}

export default async function StationById(props: PageProps<"/stations/[id]">) {
  const { id } = await props.params

  if (STATION_ID_REGEX.test(id)) {
    return <StationTable id={id} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid station ID: ${id}`} />
    </div>
  )
}
