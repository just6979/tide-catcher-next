import { coordsFromLatLon, coordsToString } from "@/app/_lib/coords"
import { fetchNoaaUrl } from "@/app/_lib/noaa"
import { makeStationsError } from "@/app/_lib/stationsUtils"
import type {
  Coords,
  NoaaTidePredStation,
  Station,
  StationsResponse,
} from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"

export async function stationsFromCoords(
  location: Coords,
  count = Infinity,
  initialRange = 10,
): Promise<StationsResponse> {
  const utcDate = new UTCDate()
  let range = initialRange / 2
  let attempts = 5

  do {
    range *= 2
    attempts -= 1

    const data = await fetchNoaaUrl(
      `/mdapi/prod/webapi/tidepredstations.json?lat=${location.lat}&lon=${location.lon}&range=${range}`,
    )

    if ("errorMsg" in data)
      return makeStationsError(
        { code: data.errorCode, msg: data.errorMsg },
        utcDate,
      )

    const stations: NoaaTidePredStation[] = data["stationList"]
    if (stations != null) {
      const stationsSlice = stations.slice(0, Math.min(count, stations.length))
      const stationsOut: Station[] = stationsSlice.map(
        (station: NoaaTidePredStation): Station => {
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
        },
      )
      return {
        status: {
          code: 200,
        },
        reqTimestamp: utcDate.toISOString(),
        reqLocation: location,
        count: stationsOut.length,
        stations: stationsOut,
      }
    }
  } while (attempts > 0)

  // no stations found after maxing out the range
  return makeStationsError(
    {
      code: 404,
      msg: `No stations found within ${range} miles of location (${coordsToString(location)}).`,
    },
    utcDate,
    location,
  )
}
