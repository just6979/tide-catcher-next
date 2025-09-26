import responseData from '../../data/tc_plum_island_example.json'
import {NextRequest, NextResponse} from "next/server"

export async function GET(request: NextRequest) {
  console.log("incoming request: " + request.url)

  const location = '42.6726,-70.9441'

  const old_api_url = 'https://tide-catcher.appspot.com/json/tides/by-location/' + location
  console.log("outgoing request: " + old_api_url)

  const old_api_response = await fetch(old_api_url, {cache: 'force-cache'})
  const old_api_data = await old_api_response.json()

  console.log("response length: " + old_api_data.length)

  return NextResponse.json(old_api_data)
}
