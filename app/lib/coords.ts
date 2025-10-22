import type { Coords } from "@/app/lib/types"

export function coordsFromLatLon(lat: number, lon: number): Coords | undefined {
  if (lat < -90 || lat > 90) {
    console.error(`coordsFromString: Invalid latitude: ${lat}\`)`)
    return undefined
  }
  if (lon < -180 || lon > 180) {
    console.warn(`coordsFromString: Potentially invalid longitude: ${lon}\`)`)
    // don't error out on longitude because the range is more geopolitical than physical
  }
  return { lat: lat, lon: lon }
}

export function coordsFromString(locationString: string): Coords | undefined {
  const location = locationString.split(",")
  if (location.length != 2) {
    console.error(
      `coordsFromString: Invalid location string, expect comma-separated numbers: ${location}`,
    )
    return undefined
  }
  const lat = Number(location[0])
  const lon = Number(location[1])
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    console.error(
      `coordsFromString: Invalid location string: expected 2 valid numbers: ${location}`,
    )
    return undefined
  }
  return coordsFromLatLon(lat, lon)
}

export function coordsToString(coords: Coords | undefined): string {
  if (coords == undefined) {
    return "Unknown"
  }
  return `${coords.lat.toFixed(3)},${coords.lon.toFixed(3)}`
}
