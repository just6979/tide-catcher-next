import { DEFAULT_STATION } from "@/app/_lib/constants"
import { coordsToString } from "@/app/_lib/coords"
import { stationsById } from "@/app/_lib/stationsLocal"
import type { Station } from "@/app/_lib/types"

export async function generateStaticParams() {
  return [{ id: [DEFAULT_STATION] }]
}

export default async function StationFromStation({
  params,
}: {
  params: Promise<{ id?: string[] | undefined }>
}) {
  const { id } = await params
  const stationId = id && id.length > 0 ? id[0] : DEFAULT_STATION

  const data = await stationsById(stationId)

  if (!data || !("stations" in data) || !(data.stations.length > 0)) {
    return <p>No Station with ID {stationId} found.</p>
  }

  const stationItem: Station = data.stations[0]
  return (
    <table className="request-info single-station">
      <caption>{stationItem.name}</caption>
      <tbody>
        <tr>
          <td>NOAA ID</td>
          <td>
            <a
              href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${stationItem.id}`}
              target="_blank"
            >
              {stationItem.id}
            </a>
          </td>
        </tr>
        <tr>
          <td>Location</td>
          <td>
            [
            <a
              href={`https://www.google.com/maps/place/${coordsToString(stationItem.location)}/@${coordsToString(stationItem.location)},12z`}
              target="_blank"
            >
              {coordsToString(stationItem.location)}
            </a>
            ]
          </td>
        </tr>
        <tr>
          <td>Common Name</td>
          <td>{stationItem.commonName}</td>
        </tr>
        <tr>
          <td>Full Name</td>
          <td>{stationItem.fullName}</td>
        </tr>
        <tr>
          <td>eTides Name</td>
          <td>{stationItem.etidesName}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{stationItem.state}</td>
        </tr>
        <tr>
          <td>Region</td>
          <td>{stationItem.region}</td>
        </tr>
        <tr>
          <td>Timezone Offset</td>
          <td>{stationItem.tzOffset}</td>
        </tr>
      </tbody>
    </table>
  )
}
