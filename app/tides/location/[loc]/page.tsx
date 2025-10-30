import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import TidesFromLocation from "@/app/_components/TidesFromLocation"
import { coordsFromString } from "@/app/_lib/coords"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ loc: string }>
}): Promise<Metadata> {
  const { loc } = await params
  const location = decodeURIComponent(loc)
  return {
    title: ` @ [${location}]`,
  }
}

export default async function TidesByLocation({
  params,
}: {
  params: Promise<{ loc: string }>
}) {
  const { loc } = await params
  const location = decodeURIComponent(loc)

  if (coordsFromString(location)) {
    return <TidesFromLocation location={location} />
  }

  return (
    <div>
      <ErrorMsg msg={`Invalid location: [${location}]`} />
      <StartOver />
    </div>
  )
}
