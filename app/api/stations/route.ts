export async function GET() {
  const external_response = fetch(
    'https://tide-catcher.appspot.com/json/stations',
    {cache: 'force-cache'}
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
     })

  const data = await external_response;
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
