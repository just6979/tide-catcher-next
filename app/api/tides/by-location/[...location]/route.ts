import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: Promise<{ location: string }> }) {
  console.log("incoming request: " + request.url)

  const {location} = await params;

  const old_api_url = 'https://tide-catcher.appspot.com/json/tides/by-location/'.concat(location);
  console.log(old_api_url)

  const old_api_response = await fetch(old_api_url, {cache: 'force-cache'})
  const old_api_data = await old_api_response.json();

  return NextResponse.json(old_api_data)
}
