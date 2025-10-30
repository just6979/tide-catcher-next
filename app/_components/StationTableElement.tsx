import ErrorMsg from "@/app/_components/ErrorMsg"
import { coordsToString } from "@/app/_lib/coords"
import { stationsById } from "@/app/_lib/stationsLocal"
import type { Station } from "@/app/_lib/types"

export default async function StationTableElement(props: { id: string }) {
  const { id } = props

  const data = await stationsById(id)
  if (data.stations.length === 0) {
    return <ErrorMsg msg={`Station ${id} not found.`} />
  }
  const station: Station = data.stations[0]

  return (
    <table className="request-info single-station">
      <caption>{station.name}</caption>
      <tbody>
        <tr>
          <td>NOAA ID</td>
          <td>
            <a
              href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${station.id}`}
              target="_blank"
            >
              {station.id}
            </a>
          </td>
        </tr>
        <tr>
          <td>Location</td>
          <td>
            [
            <a
              href={`https://www.google.com/maps/place/ ${coordsToString(station.location)}/@${coordsToString(station.location)},12z`}
              target="_blank"
            >
              {coordsToString(station.location)}
            </a>
            ]
          </td>
        </tr>
        <tr>
          <td>Common Name</td>
          <td>{station.commonName}</td>
        </tr>
        <tr>
          <td>Full Name</td>
          <td>{station.fullName}</td>
        </tr>
        <tr>
          <td>eTides Name</td>
          <td>{station.etidesName}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{station.state}</td>
        </tr>
        <tr>
          <td>Region</td>
          <td>{station.region}</td>
        </tr>
        <tr>
          <td>Timezone Offset</td>
          <td>{station.tzOffset}</td>
        </tr>
      </tbody>
    </table>
  )
}
