export async function GET() {
  const external_response = await fetch(
    'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'
  )
  const in_data = await external_response.json();

  const stations = in_data['stations'].map((station: {
    id: string,
    name: string,
    lat: number,
    lng: number
  } ) => ({
    id: station.id,
    name: station.name,
    lat: station.lat,
    lon: station.lng
  }));

  const out_data = {count: in_data['count'], stations: stations};

  return new Response(JSON.stringify(out_data), {
    headers: {'Content-Type': 'application/json'},
  });
}