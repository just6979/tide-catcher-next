export default async function stationsNearby(location: string, initialRange: number = 10) {
  const lat = location.split(',')[0]
  const lon = location.split(',')[1]

  let range = initialRange
  let attempts = 4

  while (attempts > 0) {
    const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json?` +
      `lat=${lat}&lon=${lon}&radius=${range}`
    console.log(url)
    const nearbyResponse = await fetch(url, {cache: 'force-cache'}
    )
    const nearbyData = await nearbyResponse.json()

    const stationsList = nearbyData['stationList']
    if (stationsList != null) {
      const firstStation = stationsList[0]
      const stationId = firstStation['stationId']
      return {
        req_lat: lat,
        req_lon: lon,
        station_id: stationId,
      }

    }
    attempts -= 1
    range *= 2
  }

  return {
    error: `No stations found within ${range} miles of location (${location}).`
  }
}
