import { coordsFromLatLon } from "@/app/_lib/coords"
import { fetchNoaaUrl } from "@/app/_lib/noaa"
import { getStation, refreshStationsData } from "@/app/_lib/storageSqlite"
import type {
  NoaaCoOpsStation,
  Station,
  StationsResponse,
} from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"
import fs from "node:fs"

async function tryFallbacks(id: string): Promise<Station | undefined> {
  let station
  // read directly from local JSON file
  const stationsFile = fs.readFileSync("./app/_data/stations.json")
  const stationData = JSON.parse(stationsFile.toString())
  const stationList: Station[] = stationData["stationList"]
  station = stationList.find((station) => {
    if (station.id === id) {
      return station
    }
  })
  if (!station) {
    // somehow can't even read the JSON file
    // then revert to using the NOAA CO-OPS API
    const data = await fetchNoaaUrl(`/mdapi/prod/webapi/stations/${id}.json`)
    const stations: NoaaCoOpsStation[] = data["stations"]
    if (stations && stations.length !== 0 && stations[0]) {
      const s = stations[0]
      station = {
        id: s.id,
        location: coordsFromLatLon(s.lat, s.lng),
        name: s.name,
        commonName: s.name,
        fullName: s.name,
        etidesName: s.name,
        state: s.state,
        region: s.state,
        tzOffset: s.timezonecorr,
      }
    }
  }
  return station
}

export async function stationsFromStation(
  id: string,
): Promise<StationsResponse> {
  const utcDate = new UTCDate()

  let station
  try {
    station = getStation(id)
  } catch {
    console.log("Can't open Stations DB, attempting to create it.")
    refreshStationsData()
    try {
      station = getStation(id)
    } catch {
      console.error("Still can't open Stations DB, using fallbacks.")
      station = await tryFallbacks(id)
    }
  }

  if (!station) {
    return {
      status: {
        code: 404,
        msg: `No stations found for ID: ${id}`,
      },
      reqTimestamp: utcDate.toISOString(),
      count: [].length,
      stations: [],
    }
  }

  return {
    status: {
      code: 200,
    },
    reqTimestamp: utcDate.toISOString(),
    count: 1,
    stations: [station],
  }
}
