export async function GET() {
  const external_response = await fetch(
    'https://tide-catcher.appspot.com/json/stations',
    {cache: 'force-cache'}
  )
  const data = await external_response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
