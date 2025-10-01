import {subHours} from "date-fns";
import {stationById} from "@/app/lib/stationById";

export default async function tidesByStation(station_id: string) {
  const weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]

  const now_date = new Date()
  const backdateHours = 12;
  const req_date = subHours(now_date, backdateHours)

  const month = String(req_date.getMonth() + 1).padStart(2, '0')
  const hours = String(req_date.getHours()).padStart(2, '0');
  const minutes = String(req_date.getMinutes()).padStart(2, '0');

  const date_string = `${req_date.getFullYear()}${month}${req_date.getDate()} ${hours}:${minutes}`;
  const range = `48`;
  const url = encodeURI('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?' +
    'product=predictions&interval=hilo&datum=MLLW&format=json&units=metric&time_zone=lst_ldt' +
    `&station=${station_id}&begin_date=${date_string}&range=${range}`)

  const external_response = await fetch(
    url,
    {cache: 'force-cache'}
  )
  const data = await external_response.json();

  let out_data
  if ('error' in data) {
    out_data = {
      req_time: now_date.toISOString(),
      message: "Error calling NOAA CO-OPS Data Retrieval API.",
      url: url,
      co_ops_response: data
    }
  } else {
    const tides = []
    for (const i in data.predictions) {
      const prediction = data.predictions[i]
      const in_date: string = prediction.t
      const tide_date = new Date(in_date)
      const tide = {
        source_date: in_date,
        date: `${(tide_date.getMonth() + 1).toString().padStart(2, '0')}/` +
          `${tide_date.getDate().toString().padStart(2, '0')}`,
        day: weekDays[tide_date.getDay()],
        height: Number(prediction.v),
        iso_date: tide_date.toISOString(),
        prior: tide_date < now_date ? 'prior' : 'future',
        time: `${tide_date.getHours().toString().padStart(2, '0')}:` +
          `${tide_date.getMinutes().toString().padStart(2, '0')}`,
        type: prediction.type === 'H' ? 'high' : 'low'
      }
      tides.push(tide)
    }

    const station_data = await stationById(station_id)
    out_data = {
      req_timestamp: now_date.toISOString(),
      resp_lat: station_data.lat.toFixed(5),
      resp_lon: station_data.lon.toFixed(5),
      station_id: station_id,
      station_name: station_data.name,
      status: 200,
      tides: tides
    }
  }

  return out_data
}
