export default interface Coords {
  lat: number
  lon: number
}

export const ZERO_COORDS: Coords = coordsFromLatLon(0, 0)

export function coordsFromLatLon(lat: number, lon: number): Coords {
  return {lat, lon}

}
export function coordsFromString(locationString: string): Coords {
  const location = locationString.split(',')
  if (location.length != 2) {
    return ZERO_COORDS
  }
  return coordsFromLatLon(Number(location[0]), Number(location[1]))
}

export function coordsToString(coords: Coords): string {
  return `${coords.lat.toFixed(5)},${coords.lon.toFixed(5)}`
}

export function coordsToBracketString(coords: Coords): string {
  return `[${coordsToString(coords)}]`
}
