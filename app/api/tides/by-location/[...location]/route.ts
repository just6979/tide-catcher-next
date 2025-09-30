import tides_by_location from "@/app/api/tides/by-location/helper";

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location;
  return tides_by_location(location);
}
