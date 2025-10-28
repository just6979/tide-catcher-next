import { coordsFromLatLon } from "@/app/_lib/coords"
import type { NoaaTidePredStation, Station } from "@/app/_lib/types"
import fs from "node:fs"
import path from "node:path"
import * as url from "node:url"

async function main(filename: string) {
  const url =
    "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json"
  console.log(`Fetching ${url}`)
  const tpRes = await fetch(url)
  const tpData = await tpRes.json()
  const tpStations: NoaaTidePredStation[] = tpData["stationList"]
  console.log(`Mapping ${tpStations.length} to local stations`)
  const stations = tpStations.map((s): Station => {
    return {
      id: s.stationId,
      location: coordsFromLatLon(s.lat, s.lon),
      name: s.stationName,
      commonName: s.commonName,
      fullName: s.stationFullName,
      etidesName: s.etidesStnName,
      state: s.state,
      region: s.region,
      tzOffset: Number(s.timeZoneCorr),
    }
  })
  console.log("Writing to local JSON.")
  fs.writeFileSync(
    filename,
    JSON.stringify({
      count: stations.length,
      stationList: stations,
    }),
  )
}

if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url)
  const moduleParent = path.dirname(modulePath)
  if (process.argv[1] === modulePath) {
    await main(path.join(moduleParent, "stations.json"))
  }
}
