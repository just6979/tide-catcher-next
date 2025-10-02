import {stationsAll} from "@/app/lib/stationsAll"

export async function GET() {
  // fetch all stations from NOAA
  const responseData = await stationsAll()

  return new Response(JSON.stringify(responseData), {
    headers: {'Content-Type': 'application/json'},
  })
}
