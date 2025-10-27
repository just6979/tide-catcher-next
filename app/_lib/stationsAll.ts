import { getAllStations } from "@/app/_lib/storageSqlite"
import type { StationsResponse } from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"

export function stationsAll(): StationsResponse {
  const utcDate = new UTCDate()

  const stations = getAllStations()

  return {
    status: {
      code: 200,
    },
    reqTimestamp: utcDate.toISOString(),
    count: stations.length,
    stations: stations,
  }
}
