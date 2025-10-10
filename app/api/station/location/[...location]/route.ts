import stationsFromLocation from '@/app/lib/stationsFromLocation'

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location[0]
  const responseData = await stationsFromLocation(location, 1)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
