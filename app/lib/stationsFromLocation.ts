import {processTidePredStations} from '@/app/lib/processStations'

export default async function stationsFromLocation(location: string, count = Infinity, initialRange = 10) {
  const lat = Number(location.split(',')[0])
  const lon = Number(location.split(',')[1])
  let range = initialRange
  let attempts = 4

  while (attempts > 0) {
    const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json?` +
      `lat=${lat}&lon=${lon}&range=${range}`
    const stationsResponse = await fetch(url, {cache: 'force-cache'})
    const stationsData = await stationsResponse.json()

    const stations = stationsData['stationList']
    if (stations != null) {
      return processTidePredStations(stations, count, location)
    }

    attempts -= 1
    range *= 2
  }

  return {
    error: `No stations found within ${range} miles of location (${location}).`
  }
}
