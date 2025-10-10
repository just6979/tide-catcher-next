import tidesFromLocation from '@/app/lib/tidesFromLocation'

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location[0]
  const responseData = await tidesFromLocation(location)

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
