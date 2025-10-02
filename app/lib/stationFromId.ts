import {processStationsById} from "@/app/lib/processStations";

export async function stationFromId(id: string) {
  const url = `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${id}.json`
  const stationsResponse = await fetch(url, {cache: 'force-cache'})
  const stationsData = await stationsResponse.json()

  const stations = stationsData['stations']
  if (stations != null) {
    return processStationsById(stations);
  }

  return {error: `No stations found with ID: ${id}.`}
}
