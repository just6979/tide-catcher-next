export default async function tides_by_location(location: string) {
  const external_response = await fetch(
    'https://tide-catcher.appspot.com/json/tides/by-location/' + location,
    {cache: 'force-cache'}
  )
  const data = await external_response.json();
  delete data.wti_copyright
  return new Response(JSON.stringify(data), {
    headers: {'Content-Type': 'application/json'},
  });
}
