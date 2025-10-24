import TidesElement from "@/app/_components/TidesElement"
import { EMPTY_TIDES_RESPONSE } from "@/app/_lib/constants"
import type { TidesResponse } from "@/app/_lib/types"
import { useEffect, useMemo, useState } from "react"

export default function TidesFromLocationElement(props: { location: string }) {
  const location = props.location
  const nowDate = useMemo(() => new Date(), [])

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(EMPTY_TIDES_RESPONSE)

  useEffect(() => {
    fetch(`/api/tides/location/${location}`, {
      headers: {
        "X-Tidecatcher-Tz-Offset": (
          nowDate.getTimezoneOffset() * -1
        ).toString(),
      },
    })
      .then((res) => res.json())
      .then((data: TidesResponse) => {
        setData(data)
        setIsLoading(false)
      })
  }, [location, nowDate])

  if (isLoading) {
    return <p>Loading Tides near [{location}]...</p>
  }
  if (!data || !("tides" in data) || !(data.tides.length > 0)) {
    return <p>No Tides found near [{location}].</p>
  }
  if (data.status.code != 200) {
    return (
      <p>
        Error: {data.status.code}: {data.status.msg}
      </p>
    )
  }

  return <TidesElement data={data} nowDate={nowDate} />
}
