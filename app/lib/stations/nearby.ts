export default async function nearby(location: string, initial_range: number = 10) {
  const lat = location.split(',')[0]
  const lon = location.split(',')[1]

  let range = initial_range
  let attempts = 4

  while (attempts > 0) {
    const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json?` +
      `lat=${lat}&lon=${lon}&radius=${range}`
    console.log(url)
    const nearby_response = await fetch(url, {cache: 'force-cache'}
    )
    const nearby_data = await nearby_response.json()

    const stations_list = nearby_data['stationList']
    if (stations_list != null) {
      const first_station = stations_list[0]
      const station_id = first_station['stationId']
      return {
        station_id: station_id,
      }

    }
    attempts -= 1
    range *= 2
  }

  return {
    error: `No stations found within ${range} miles of location (${location}).`
  }
}
