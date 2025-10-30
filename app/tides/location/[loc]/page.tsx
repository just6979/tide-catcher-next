import ErrorMsg from "@/app/_components/ErrorMsg"
import StartOver from "@/app/_components/StartOver"
import TidesFromLocation from "@/app/_components/TidesFromLocation"
import { coordsFromString } from "@/app/_lib/coords"
import type { Metadata } from "next"

export async function generateMetadata(
  props: PageProps<"/tides/location/[loc]">,
): Promise<Metadata> {
  const { loc } = await props.params
  const location = decodeURIComponent(loc)
  return {
    title: ` @ [${location}]`,
  }
}

export default async function TidesByLocation(
  props: PageProps<"/tides/location/[loc]">,
) {
  const { loc } = await props.params
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
