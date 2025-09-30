import {tides_by_location} from "@/app/api/tides/by-location/[...location]/route"

export async function GET() {
  return tides_by_location('42.7101,-70.7886')
}
