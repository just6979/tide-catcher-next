import {formatISO, subHours} from 'date-fns'
import {TZDateMini} from '@date-fns/tz'
import {UTCDate} from '@date-fns/utc'

import {ZERO_COORDS} from '@/app/lib/coords'
import {checkNoaaError, fetchNoaaUrl} from '@/app/lib/noaa'
import {stationsFromCoords} from '@/app/lib/stationsFromCoords'
import {stationsFromStation} from '@/app/lib/stationsFromStation'
import type {Coords, StationsResponse, Tide, TidesResponse} from '@/app/lib/types'

const emptyStation = {id: '', location: ZERO_COORDS, name: '', eTidesName: '', tzOffset: 0}

interface NoaaTidePrediction {
  t: string,
  v: string,
  type: string
}

export async function tidesFromCoords(location: Coords, tzOffset?: string): Promise<TidesResponse> {
  const stationData = await stationsFromCoords(location, 1)
  return await tidesProcessing(stationData, new UTCDate(), location, tzOffset)
}

export async function tidesFromStation(stationId: string, tzOffset?: string): Promise<TidesResponse> {
  const stationData = await stationsFromStation(stationId)
  return await tidesProcessing(stationData, new Date(), ZERO_COORDS, tzOffset)
}

async function tidesProcessing(
  stationData: StationsResponse, nowDate: Date, reqLocation: Coords, tzOffset?: string
): Promise<TidesResponse> {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (stationData.status !== 'OK' || stationData.stations.length == 0) {
    return {
      status: stationData.status,
      message: `Error calling NOAA API: ${stationData.message}`,
      reqTimestamp: nowDate.toISOString(),
      reqLocation: reqLocation,
      station: emptyStation,
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

  let data = await fetchNoaaUrl(url)

  const error = checkNoaaError(data)
  if (error) {
    return {
      status: 'Error',
      message: `Error calling NOAA API: ${error}`,
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
      day: weekDays[localDate.getDay()],
      date:
        `${(localDate.getMonth() + 1).toString().padStart(2, '0')}/` +
        `${localDate.getDate().toString().padStart(2, '0')}`,
      height: Number(prediction.v)
    }
  })

  return {
    status: 'OK',
    message: '',
    reqTimestamp: nowDate.toISOString(),
    reqLocation: reqLocation,
    station: station,
    tides: tides
  }
}
