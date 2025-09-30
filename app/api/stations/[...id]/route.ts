export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const external_response = await fetch(
    `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${id}.json`,
    {cache: 'force-cache'}
  )
  const in_data = await external_response.json();

  const station_data = in_data['stations'][0]
  const out_data = {
    id: station_data.id,
    name: station_data.name,
    lat: station_data.lat,
    lon: station_data.lng,
    source: station_data.self
  }

  return new Response(JSON.stringify(out_data), {
    headers: {'Content-Type': 'application/json'},
  });
}