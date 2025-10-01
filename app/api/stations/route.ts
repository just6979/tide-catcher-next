import {stationsAll} from "@/app/lib/stationsAll";

export async function GET() {
  // fetch all stations from NOAA
  const response_data = await stationsAll();

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  });
}