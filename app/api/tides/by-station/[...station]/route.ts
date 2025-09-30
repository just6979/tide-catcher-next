import tides_by_station from "@/app/api/tides/by-station/helper";

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location
  return tides_by_station(location)
}
