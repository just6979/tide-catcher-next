import { coordsFromLatLon } from "@/app/_lib/coords"
import { fetchNoaaUrl } from "@/app/_lib/noaa"
import type {
  NoaaCoOpsStation,
  NoaaTidePredStation,
  Station,
  StationsResponse,
} from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"
import fs from "node:fs"

export async function stationsById(id?: string): Promise<StationsResponse> {
  const utcDate = new UTCDate()

  let stations: Station[] = []
  try {
    const stationsFile = fs.readFileSync("./app/_data/stations.json")
    const stationData = JSON.parse(stationsFile.toString())
    const stationList: Station[] = stationData["stationList"] || []
    if (stationList && stationList.length > 0) {
      if (!id) {
        stations = stationList
      } else {
        const station = stationList.find((station) => station.id === id)
        if (station) stations = [station]
      }
    }
  } catch (error) {
    console.log(`Unable to read local 'stations.json': ${error})`)
    if (id) {
      stations = await fallBackNoaaById(id)
    } else {
      stations = await fallbackNoaaAll()
    }
  }

  let status
  if (stations.length === 0) {
    console.error("No stations found.")
    status = {
      code: 404,
      msg: `No stations found for ID: ${id}`,
    }
    }else {
      status = { code: 200}
    }

  return {
    status: status,
    reqTimestamp: utcDate.toISOString(),
    count: stations.length,
    stations: stations,
  }
}

async function fallbackNoaaAll(): Promise<Station[]> {
  console.log("Falling back to using NOAA TidePredStations API.")
  const data = await fetchNoaaUrl(`/mdapi/prod/webapi/tidepredstations.json`)
  const stations: NoaaTidePredStation[] = data["stationList"] || []
  if (stations && stations.length !== 0) {
    return stations.map((station: NoaaTidePredStation) => {
      return {
        id: station.stationId,
        location: coordsFromLatLon(station.lat, station.lon),
        name: station.stationName,
        commonName: station.commonName,
        fullName: station.stationFullName,
        etidesName: station.etidesStnName,
        state: station.state,
        region: station.region,
        tzOffset: Number(station.timeZoneCorr),
        distance: station.distance,
      }
    })
  }
  return []
}

async function fallBackNoaaById(id: string): Promise<Station[]> {
  console.log("Falling back to using NOAA CO-OPS API.")
  const data = await fetchNoaaUrl(`/mdapi/prod/webapi/stations/${id}.json`)
  const stations: NoaaCoOpsStation[] = data["stations"] || []
  if (stations && stations.length !== 0) {
    return [
      {
        id: stations[0].id,
        location: coordsFromLatLon(stations[0].lat, stations[0].lng),
        name: stations[0].name,
        commonName: stations[0].name,
        fullName: stations[0].name,
        etidesName: stations[0].name,
        state: stations[0].state,
        region: stations[0].state,
        tzOffset: stations[0].timezonecorr,
      },
    ]
  }
  return []
}
