import type { Coords, StationsResponse, Status } from "@/app/_lib/types"

export function makeStationsError(
  status: Status,
  timestamp: Date,
  location?: Coords,
): StationsResponse {
  return {
    status: status,
    reqTimestamp: timestamp.toISOString(),
    reqLocation: location,
    count: 0,
    stations: [],
  }
}
