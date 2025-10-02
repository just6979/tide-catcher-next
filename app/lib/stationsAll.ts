import {check, initStorage, read, write} from "@/app/lib/storage"
import {processTidePredStations} from "@/app/lib/processStations";

export async function stationsAll(forceFetch = false) {
  initStorage()

  let found = false
  let stationsData

  if (!forceFetch) {
    console.log(`${__filename}: Checking for cached stations.json`)
    if (await check('stations.json')) {
      try {
        const outData = JSON.parse(await read('stations.json'))
        console.log(`${__filename}: Using cached stations.json`)
        return outData
      } catch (err) {
        console.log(`${__filename}: Unable to parse stations.json: ${err}`)
      }
    }
  }

  console.log(`${__filename}: No cached stations.json found`)
  const stationsUrl = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json'
  console.log(`${__filename}: Fetching new stations.json from ${stationsUrl}`)

  const stationsResponse = await fetch(stationsUrl)
  stationsData = await stationsResponse.json()

  const stations = stationsData['stationList'];
  if (stations != null) {
    const count = stations.length
    const stationsData = processTidePredStations(stations, count);
    await write('stations.json', JSON.stringify(stationsData))
    return stationsData
  }

  return {
    error: `No stations found.`
  }
}
