import { getStation } from "@/app/_lib/storageSqlite"
import type { StationsResponse } from "@/app/_lib/types"
import { UTCDate } from "@date-fns/utc"

export function stationsFromStation(id: string): StationsResponse {
  const utcDate = new UTCDate()

  const station = getStation(id)

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
