import {subHours} from "date-fns";

const weekDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  const location = (await params).location
  return tides_by_station(location)
}

export async function tides_by_station(station: string) {
  const now_date = new Date()
  const req_date = subHours(now_date, 12)

  const month = String(req_date.getMonth() + 1).padStart(2, '0')
  const hours = String(req_date.getHours()).padStart(2, '0');
  const minutes = String(req_date.getMinutes()).padStart(2, '0');

  const dateString = `${req_date.getFullYear()}${month}${req_date.getDate()} ${hours}:${minutes}`;
  const range = `48`;
  const url = encodeURI('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?' +
    'product=predictions&interval=hilo&datum=MLLW&format=json&units=metric&time_zone=lst_ldt' +
    `&station=${station}&begin_date=${dateString}&range=${range}`)
  console.log(url)

  const external_response = await fetch(
    url,
    {cache: 'force-cache'}
  )
  const data = await external_response.json();

  let tides = []
  for (let i in data.predictions) {
    const prediction = data.predictions[i]
    const in_date: string = prediction.t
    const tide_date = new Date(in_date)
    const tide = {
      source_date: in_date,
      date: `${(tide_date.getMonth() + 1).toString().padStart(2, '0')}-` +
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

  const out_data = {
    resp_lat: 42.7101,
    resp_lon: -70.7886,
    station_id: station,
    station: "Plum Island Sound (south end), Massachusetts",
    station_tz: "America/New_York",
    status: 200,
    tides: tides
  }

  return new Response(JSON.stringify(out_data), {
    headers: {'Content-Type': 'application/json'},
  })
}
