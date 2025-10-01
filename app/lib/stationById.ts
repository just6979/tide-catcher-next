export async function stationById(stationId: string) {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${stationId}.json`
  const externalResponse = await fetch(url, {cache: 'force-cache'})

  const inData = await externalResponse.json()

  const stationData = inData['stations'][0]

  return {
    id: stationData.id,
    name: stationData.name,
    lat: stationData.lat,
    lon: stationData.lng,
    source: stationData.self,
    station_tz: stationData.timezonecorr
  }
}