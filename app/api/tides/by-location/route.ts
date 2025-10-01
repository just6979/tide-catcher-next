import tidesByLocation from "@/app/lib/tidesByLocation"

export async function GET() {
  const location = '42.71014,-70.78861' /* Plum Island South */
  const response_data = await tidesByLocation(location)

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
