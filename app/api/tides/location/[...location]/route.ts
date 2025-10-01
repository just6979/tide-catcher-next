import tidesFromLocation from "@/app/lib/tidesFromLocation"

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location[0]
  const response_data= await tidesFromLocation(location)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
