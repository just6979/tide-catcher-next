import { stationsById } from "@/app/_lib/stationsLocal"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "| Stations List",
}

export default async function StationsAll() {
  const data = await stationsById()

  if (!data || !("stations" in data) || !(data.stations.length > 0)) {
    return <p>No Stations List found.</p>
  }
  if (data.status.code != 200) {
    return (
      <p>
        Error: {data.status.code}: {data.status.msg}
      </p>
    )
  }

  return (
    <div id="stations">
      <h2>Stations</h2>
      <p>{data.count} stations available </p>
      <ul>
        {data.stations.map((station) => (
          <li key={station.id}>
            <Link href={`/station/${station.id}`}>{station.id}</Link>:{" "}
            {station.name}
            {station.state ? `, ${station.state}` : `, ${station.region}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
