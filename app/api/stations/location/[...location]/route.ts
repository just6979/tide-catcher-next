import stationsFromLocation from "@/app/lib/stationsFromLocation"

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location[0]
  const response_data= await stationsFromLocation(location, 10)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
