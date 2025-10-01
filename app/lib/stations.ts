import {check, initStorage, read, write} from "@/app/lib/storage"

export async function stations() {
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
    const externalResponse = await fetch(stationsUrl)
    stationsData = await externalResponse.json()
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
  }))

  const outData = {count: stationsData['count'], stations: stations}

  if (!isCached) {
    console.log(`${__filename}: Caching stations.json`)
    await write('stations.json', JSON.stringify(outData))
  }
  return outData
}