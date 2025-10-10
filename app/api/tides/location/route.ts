import tidesFromLocation from '@/app/lib/tidesFromLocation'

export async function GET() {
  const location = '42.71014,-70.78861' /* Plum Island South */
  const responseData = await tidesFromLocation(location)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
