export async function by_id(station_id: string) {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${station_id}.json`
  console.log(url)

  const external_response = await fetch(url, {cache: 'force-cache'})

  const in_data = await external_response.json()

  const station_data = in_data['stations'][0]

  return {
    id: station_data.id,
    name: station_data.name,
    lat: station_data.lat,
    lon: station_data.lng,
    source: station_data.self
  }
}