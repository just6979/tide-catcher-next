import stationsNearby from "@/app/lib/stationsNearby"

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location[0]
  const response_data= await stationsNearby(location, 10)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
