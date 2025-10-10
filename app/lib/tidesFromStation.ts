import {subHours} from 'date-fns'
import {stationFromId} from '@/app/lib/stationFromId'

export default async function tidesFromStation(stationId: string) {
  const weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]

  const nowDate = new Date()
  const backdateHours = 7
  const reqDate = subHours(nowDate, backdateHours)

  const month = String(reqDate.getMonth() + 1).padStart(2, '0')
  const day = String(reqDate.getDate()).padStart(2, '0')
  const hours = String(reqDate.getHours()).padStart(2, '0')
  const minutes = String(reqDate.getMinutes()).padStart(2, '0')

  const dateString = `${reqDate.getFullYear()}${month}${day} ${hours}:${minutes}`
  const range = (48 + backdateHours).toString()
  const url = encodeURI('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?' +
    'product=predictions&interval=hilo&datum=MLLW&format=json&units=metric&time_zone=lst_ldt' +
    `&station=${stationId}&begin_date=${dateString}&range=${range}`)

  const noaaResponse = await fetch(
    url,
    {cache: 'force-cache'}
  )
  const data = await noaaResponse.json()

  let outData
  if ('error' in data) {
    outData = {
      reqTime: nowDate.toISOString(),
      message: 'Error calling NOAA CO-OPS Data Retrieval API.',
      url: url,
      noaaApiResponse: data
    }
  } else {
    const tides = []
    for (const i in data.predictions) {
      const prediction = data.predictions[i]
      const inDate: string = prediction.t
      const tideDate = new Date(inDate)
      const tide = {
        sourceDate: inDate,
        date: `${(tideDate.getMonth() + 1).toString().padStart(2, '0')}/` +
          `${tideDate.getDate().toString().padStart(2, '0')}`,
        day: weekDays[tideDate.getDay()],
        height: Number(prediction.v),
        isoDate: tideDate.toISOString(),
        time: `${tideDate.getHours().toString().padStart(2, '0')}:` +
          `${tideDate.getMinutes().toString().padStart(2, '0')}`,
        type: prediction.type === 'H' ? 'high' : 'low'
      }
      tides.push(tide)
    }

    const stationsData = await stationFromId(stationId)
    if ('error' in stationsData) {
      return stationsData
    }

    const station = stationsData['stations'][0]
    outData = {
      reqLocation: '0,0',
      reqTimestamp: nowDate.toISOString(),
      stationLocation: station.location,
      stationId: stationId,
      stationName: station.name,
      stationTzOffset: station.tzOffset,
      tides: tides
    }
  }

  return outData
}
