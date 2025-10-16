import {Coords} from '@/app/lib/types'

export const ZERO_COORDS: Coords = coordsFromLatLon(0, 0)

export function coordsFromLatLon(lat: number, lon: number): Coords {
  if (lat < -90 || lat > 90) {
    console.error(`coordsFromString: Invalid latitude: ${lat}\`)`)
    return ZERO_COORDS
  }
  if (lon < -180 || lon > 180) {
    console.warn(`coordsFromString: Potentially invalid longitude: ${lon}\`)`)
    // don't error out on longitude because the range is more geopolitical than physical
  }
  return {lat, lon}
}

export function coordsFromString(locationString: string): Coords {
  const location = locationString.split(',')
  if (location.length != 2) {
    console.error(`coordsFromString: Invalid location string, expect comma-separated numbers: ${location}`)
    return ZERO_COORDS
  }
  const lat = Number(location[0])
  const lon = Number(location[1])
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    console.error(`coordsFromString: Invalid location string: expected 2 valid numbers: ${location}`)
    return ZERO_COORDS
  }
  return coordsFromLatLon(lat, lon)
}

export function coordsToString(coords: Coords): string {
  return `${coords.lat.toFixed(5)},${coords.lon.toFixed(5)}`
}
