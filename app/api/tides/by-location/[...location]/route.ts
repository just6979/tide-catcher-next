export async function GET(request: Request, {params}: { params: Promise<{ location: string }> }) {
  let location = (await params).location;
  const external_response = await fetch(
    'https://tide-catcher.appspot.com/json/tides/by-location/' + location,
    {cache: 'force-cache'}
  )
  const data = await external_response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
