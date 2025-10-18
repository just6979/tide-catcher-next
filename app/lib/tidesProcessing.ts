import {formatISO, subHours} from 'date-fns'
import {TZDateMini} from '@date-fns/tz'
import {UTCDate} from '@date-fns/utc'

import {ZERO_COORDS} from '@/app/lib/coords'
import {checkNoaaError, fetchNoaaUrl} from '@/app/lib/noaa'
import type {Coords, Station, StationsResponse, Tide, TidesResponse} from '@/app/lib/types'

interface NoaaTidePrediction {
  t: string,
  v: string,
  type: string
}

export async function tidesProcessing(
  station: Station, utcNow: Date, reqLocation: Coords, tzOffset?: string
): Promise<TidesResponse> {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  let offset = undefined
  let noaaTz = 'lst_ldt'
  let useLocalTime = true
  if (tzOffset != undefined) {
    offset = buildTzOffsetStr(tzOffset)
    noaaTz = 'gmt'
    useLocalTime = false
  }

  const backdateHours = 7
  const reqDate = subHours(utcNow, backdateHours)

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
    return makeTidesResponse(
      'Error',
      `Error calling NOAA API: ${error}`,
      utcNow,
      reqLocation,
      station,
      []
    )
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

  return makeTidesResponse('OK', '', utcNow, reqLocation, station, tides)
}

function buildTzOffsetStr(offsetIn?: string): string {
  const offset = Number(offsetIn)
  const offsetAbs = Math.abs(offset)
  const offsetHours = Math.floor(offsetAbs / 60)
  const offsetMinutes = offsetAbs % 60
  const offsetSign = offset < 0 ? '-' : '+'
  const offsetHoursStr = offsetHours.toString().padStart(2, '0')
  const offsetMinutesStr = offsetMinutes.toString().padStart(2, '0')
  return `${offsetSign}${offsetHoursStr}${offsetMinutesStr}`
}

export async function checkStationsResponse(stationData: StationsResponse, nowDate: Date, location: Coords, tzOffset: string | undefined) {
  if (stationData.status === 'OK' && stationData.stations.length > 0) {
    return await tidesProcessing((stationData.stations)[0], nowDate, location, tzOffset)
  } else {
    return makeTidesError(stationData, nowDate, location)
  }
}

function makeTidesResponse(
  status: string, msg: string, time: Date, loc: Coords, station: Station, tides: Tide[]
) {
  return {
    status: status,
    message: msg,
    reqTimestamp: time.toISOString(),
    reqLocation: loc,
    station: station,
    tides: tides
  }
}

export function makeTidesError(stationData: StationsResponse, utcNow: Date, location = ZERO_COORDS) {
  return {
    status: stationData.status,
    message: `Error calling NOAA API: ${stationData.message}`,
    reqTimestamp: utcNow.toISOString(),
    reqLocation: location,
    station: {
      id: '',
      location: ZERO_COORDS,
      name: '',
      eTidesName: '',
      tzOffset: 0
    },
    tides: []
  }
}
