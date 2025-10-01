import {station_by_id} from "@/app/lib/station_by_id";

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
  const station_id = (await params).id;
  console.log(station_id);
  const response_data = await station_by_id(station_id);

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  });
}