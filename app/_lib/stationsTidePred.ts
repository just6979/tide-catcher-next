import { MAX_TIDEPRED_RANGE } from "@/app/_lib/constants"
import { coordsFromLatLon, coordsToString } from "@/app/_lib/coords"
import { fetchNoaaUrl } from "@/app/_lib/noaa"
import type {
  Coords,
  NoaaTidePredStation,
  Station,
  StationsResponse,
} from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"

export async function stationsTidePred(
  location: Coords,
  count = Infinity,
  initialRange = 10,
): Promise<StationsResponse> {
  const utcDate = new UTCDate()
  let range = Math.min(initialRange, MAX_TIDEPRED_RANGE)
  let attempts = 5

  do {
    const data = await fetchNoaaUrl(
      `/mdapi/prod/webapi/tidepredstations.json?lat=${location.lat}&lon=${location.lon}&radius=${range}`,
    )

    if ("errorMsg" in data)
      return {
        status: { code: data.errorCode, msg: data.errorMsg },
        reqTimestamp: utcDate.toISOString(),
        count: 0,
        stations: [],
      }

    const stations: NoaaTidePredStation[] = data["stationList"]
    if (stations != null) {
      const stationsOut = stations
        .slice(0, Math.min(count, stations.length))
        .map((station: NoaaTidePredStation): Station => {
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
      return {
        status: { code: 200 },
        reqTimestamp: utcDate.toISOString(),
        reqLocation: location,
        count: stationsOut.length,
        stations: stationsOut,
      }
    }

    range *= 2
    attempts -= 1
  } while (attempts > 0 && range <= MAX_TIDEPRED_RANGE)

  // no stations found after maxing out the range
  return {
    status: {
      code: 404,
      msg: `No stations found within ${range / 2} miles of location (${coordsToString(location)}).`,
    },
    reqTimestamp: utcDate.toISOString(),
    reqLocation: location,
    count: 0,
    stations: [],
  }
}
