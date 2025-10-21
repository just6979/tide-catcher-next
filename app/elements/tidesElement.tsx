import {coordsToString} from '@/app/lib/coords'
import type {Tide, TidesResponse} from '@/app/lib/types'

export function TidesElement(data: TidesResponse, nowDate: Date) {
  const reqLoc = coordsToString(data.reqLocation)
  const stationLoc = coordsToString(data.station.location)
  return (
    <div>
      <table id="tides">
        <caption>{data.station.name}</caption>
        <tbody>
        {data.tides.map((tide: Tide) => {
          const tideType: string = tide['type']
          const arrow: string = tideType == 'high' ? '⤴' : '⤵'
          const prior = new Date(tide['isoDate']) < nowDate ? 'prior' : 'future'
          return (
            <tr key={tide['isoDate']} className={`${prior} ${tideType}`}>
              <td className="type">{arrow} {tideType.toUpperCase().padEnd(4, '\u00A0')}</td>
              <td className="time">{tide['time']}</td>
              <td className="day">{tide['day']}</td>
              <td className="date">{tide['date']}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <table className="request-info">
        <tbody>
        <tr>
          <td>Request Time</td>
          <td>{new Date(data.reqTimestamp).toLocaleString()}</td>
        </tr>
        {data.reqLocation != undefined &&
          <tr>
            <td>
              <a href={`https://www.google.com/maps/place/${reqLoc}/@${reqLoc},12z`} target="_blank">Your Location</a>
            </td>
            <td>
              [<a href={`/tides/location/${reqLoc}`}>{reqLoc}</a>]
            </td>
          </tr>
        }
        <tr>
          <td>
            <a href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${(data.station.id)}`}
               target="_blank">Station ID</a>
          </td>
          <td>
            <a href={`/tides/station/${data.station.id}`}>{data.station.id}</a>
          </td>
        </tr>
        <tr>
          <td><a href={`https://www.google.com/maps/place/${stationLoc}/@${stationLoc},12z`}
                 target="_blank">Station Location</a>
          </td>
          <td>
            [<a href={`/tides/location/${stationLoc}`}>{stationLoc}</a>]
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
