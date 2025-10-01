import {all} from "@/app/lib/stations/all";

export async function GET() {
  // fetch all stations from NOAA
  const response_data = await all();

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  });
}