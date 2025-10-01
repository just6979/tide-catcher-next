import tidesByLocation from "@/app/lib/tidesByLocation"

export async function GET() {
  const location = '42.7101,-70.7886'; /* Plum Island South */
  const response_data = await tidesByLocation(location)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
