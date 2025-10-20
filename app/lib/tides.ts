import {EMPTY_STATION, WEEKDAYS, ZERO_COORDS} from '@/app/lib/constants'
import {fetchNoaaUrl} from '@/app/lib/noaa'
import {stationsFromCoords} from '@/app/lib/stationsFromCoords'
import {stationsFromStation} from '@/app/lib/stationsFromStation'
import type {Coords, NoaaTidePrediction, StationsResponse, Tide, TidesResponse} from '@/app/lib/types'
import {TZDateMini} from '@date-fns/tz'
import {UTCDate} from '@date-fns/utc'
import {formatISO, subHours} from 'date-fns'

export async function tidesFromCoords(location: Coords, tzOffset?: string): Promise<TidesResponse> {
  const stationData = await stationsFromCoords(location, 1)
  return await processTides(stationData, new UTCDate(), location, tzOffset)
}

export async function tidesFromStation(stationId: string, tzOffset?: string): Promise<TidesResponse> {
  const stationData = await stationsFromStation(stationId)
  return await processTides(stationData, new Date(), ZERO_COORDS, tzOffset)
}

async function processTides(
  stationData: StationsResponse, nowDate: Date, reqLocation: Coords, tzOffset?: string
): Promise<TidesResponse> {
  if (stationData.status.code != 200 || stationData.stations.length == 0) {
    return {
      status: stationData.status,
      reqTimestamp: nowDate.toISOString(),
      reqLocation: reqLocation,
      station: EMPTY_STATION,
      tides: []
    }
  }
  const station = stationData.stations[0]

  let offset = undefined
  let noaaTz = 'lst_ldt'
  let useLocalTime = true
  if (tzOffset != undefined) {
    const offsetNum = Number(tzOffset)
    const offsetAbs = Math.abs(offsetNum)
    const offsetHours = Math.floor(offsetAbs / 60)
    const offsetMinutes = offsetAbs % 60
    const offsetSign = offsetNum < 0 ? '-' : '+'
    const offsetHoursStr = offsetHours.toString().padStart(2, '0')
    const offsetMinutesStr = offsetMinutes.toString().padStart(2, '0')
    offset = `${offsetSign}${offsetHoursStr}${offsetMinutesStr}`
    noaaTz = 'gmt'
    useLocalTime = false
  }

  const backdateHours = 7
  const reqDate = subHours(nowDate, backdateHours)

  const month = String(reqDate.getMonth() + 1).padStart(2, '0')
  const day = String(reqDate.getDate()).padStart(2, '0')
  const hours = String(reqDate.getHours()).padStart(2, '0')
  const minutes = String(reqDate.getMinutes()).padStart(2, '0')

  const beginDate = `${reqDate.getFullYear()}${month}${day} ${hours}:${minutes}`
  const range = (48 + backdateHours).toString()
  const url = encodeURI('/api/prod/datagetter?' +
    'product=predictions&format=json&units=metric&interval=hilo&datum=MLLW&' +
    `station=${station.id}&time_zone=${noaaTz}&begin_date=${beginDate}&range=${range}`
  )

  const data = await fetchNoaaUrl(url)

  if ('error' in data) {
    return {
      status: {
        code: 500,
        msg: `Error calling NOAA API: ${('message' in data.error ? data.error.message : 'Unknown error')}`
      },
      reqTimestamp: nowDate.toISOString(),
      reqLocation: reqLocation,
      station: station,
      tides: []
    }
  }

  const predictions: NoaaTidePrediction[] = 'predictions' in data ? data['predictions'] : []
  const tides: Tide[] = predictions.map((prediction: NoaaTidePrediction): Tide => {
    const predDate: string = `${prediction.t}${useLocalTime ? '' : 'Z'}`
    const tideDate = new UTCDate(Date.parse(predDate))
    const localDate = new TZDateMini(tideDate, offset)
    return {
      sourceDate: predDate,
      isoDate: formatISO(tideDate),
      localDate: formatISO(localDate),
      type: prediction.type === 'H' ? 'high' : 'low',
      time:
        `${localDate.getHours().toString().padStart(2, '0')}:` +
        `${localDate.getMinutes().toString().padStart(2, '0')}`,
      day: WEEKDAYS[localDate.getDay()],
      date:
        `${(localDate.getMonth() + 1).toString().padStart(2, '0')}/` +
        `${localDate.getDate().toString().padStart(2, '0')}`,
      height: Number(prediction.v)
    }
  })

  return {
    status: {
      code: 200,
      msg: undefined
    },
    reqTimestamp: nowDate.toISOString(),
    reqLocation: reqLocation,
    station: station,
    tides: tides
  }
}
