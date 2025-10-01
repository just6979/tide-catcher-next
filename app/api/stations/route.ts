import {stations} from "@/app/lib/stations"

export async function GET() {
  // fetch all stations from NOAA
  const responseData = await stations()

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}