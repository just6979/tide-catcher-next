import tides_by_location from "@/app/lib/tides_by_location"

export async function GET() {
  const location = '42.7101,-70.7886'; /* Plum Island South */
  const response_data = await tides_by_location(location)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
