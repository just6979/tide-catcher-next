import Link from 'next/link'

export default async function Tides() {
  return (
    <div id="mode-selector">
      <h3>How would you like to get your tides?</h3>
      <ul>
        <li>
          <Link href="/tides/gps">Nearby via GPS</Link>
        </li>
        <li>
          <Link href="/tides/location/42.710,-70.788">Near a given location</Link>
        </li>
        <li>
          <Link href="/tides/station/8441241">From a specific station</Link>
        </li>
      </ul>
    </div>
  )
}
