import tides_by_location from "@/app/lib/tides_by_location";

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location[0];
  const response_data= await tides_by_location(location);

  return new Response(JSON.stringify(response_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
