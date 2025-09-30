import {check, initStorage, read, store} from "@/app/lib/storage";

export async function GET() {
  initStorage()

  let stationsData
  let isCached = false

  console.log(`${__filename}: Checking for cached stations.json`)
  if (await check('stations.json')) {
    try {
      stationsData = JSON.parse(await read('stations.json'))
      isCached = true
      console.log(`${__filename}: Using cached stations.json`)
    } catch (err) {
      console.log(`${__filename}: Unable to parse stations.json: ${err}`)
    }
  } else {
    console.log(`${__filename}: No cached stations.json found`)
    const stationsUrl = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'
    console.log(`${__filename}: Fetching new stations.json from ${stationsUrl}`)
    const external_response = await fetch(stationsUrl)
    stationsData = await external_response.json();
  }

  const stations = stationsData['stations'].map((station: {
    id: string,
    name: string,
    lat: number,
    lng: number
  }) => ({
    id: station.id,
    name: station.name,
    lat: station.lat,
    lon: station.lng
  }));

  const out_data = {count: stationsData['count'], stations: stations};

  if (!isCached) {
    console.log(`${__filename}: Caching stations.json`)
    await store('stations.json', JSON.stringify(out_data));
  }

  return new Response(JSON.stringify(out_data), {
    headers: {'Content-Type': 'application/json'},
  });
}