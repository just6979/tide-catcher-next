import {tides_by_station} from "@/app/api/tides/by-station/[...station]/route"

export async function GET() {
  return tides_by_station('8441241') /* Plum Island Sound */
}
