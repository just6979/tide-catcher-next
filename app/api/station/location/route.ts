import stationsFromLocation from '@/app/lib/stationsFromLocation'

export async function GET() {
  const location = '42.71014,-70.78861' /* Plum Island South */
  const responseData = await stationsFromLocation(location, 1)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
