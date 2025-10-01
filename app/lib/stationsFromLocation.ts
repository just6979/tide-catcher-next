export default async function stationsFromLocation(location: string, count: number = 1, initialRange: number = 10) {
  const lat = Number(location.split(',')[0])
  const lon = Number(location.split(',')[1])

  let range = initialRange
  let attempts = 4

  while (attempts > 0) {
    const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json?` +
      `lat=${lat}&lon=${lon}&radius=${range}`
    const nearbyResponse = await fetch(url, {cache: 'force-cache'}
    )
    const nearbyData = await nearbyResponse.json()

    const stationsList = nearbyData['stationList']
    if (stationsList != null) {
      const outData = []
      for (let i = 0; i < count; i++) {
        if (i > stationsList.length - 1) {
          break
        }
        const firstStation = stationsList[i]
        const station = {
          id: firstStation['stationId'],
          lat: Number(firstStation['lat']),
          lon: Number(firstStation['lon']),
          name: firstStation['stationName'],
          eTidesName: firstStation['etidesStnName'],
          tz: Number(firstStation['timeZoneCorr'])
        }
        outData.push(station)
      }
      return {
        req_lat: lat,
        req_lon: lon,
        stations: outData
      }
    }
    attempts -= 1
    range *= 2
  }

  return {
    error: `No stations found within ${range} miles of location (${location}).`
  }
}
