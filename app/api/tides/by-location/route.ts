export async function GET(request: Request) {
  const location = '42.7101,-70.7886'
  const external_response = await fetch(
    'https://tide-catcher.appspot.com/json/tides/by-location/' + location,
    {cache: 'force-cache'}
  )
  const data = await external_response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
