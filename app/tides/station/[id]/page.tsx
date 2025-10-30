import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import TidesFromStation from "@/app/_components/TidesFromStation"
import { STATION_ID_REGEX } from "@/app/_lib/constants"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  return {
    title: `@ Station ${id}`,
  }
}

export default async function TidesByStation({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (STATION_ID_REGEX.test(id)) {
    return <TidesFromStation id={id} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid station ID: ${id}`} />
      <StartOver />
    </div>
  )
}
