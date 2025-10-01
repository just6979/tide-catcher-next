import by_location from "@/app/lib/tides/by_location"

export async function GET() {
  const location = '42.7101,-70.7886'; /* Plum Island Sound */
  const response_data = await by_location(location)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
