import AlertMsg from "@/app/_components/AlertMsg"
import ErrorMsg from "@/app/_components/ErrorMsg"
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
    const tzOffset = nowDate.getTimezoneOffset() * -1
    fetch(`/api/tides/location/${location}?${tzOffset}`)
      .then((res) => res.json())
      .then((data: TidesResponse) => {
        setData(data)
        setIsLoading(false)
      })
  }, [location, nowDate])

  if (isLoading) {
    return <p>Loading Tides near [{location}]...</p>
  }
  if (data.tides.length === 0) {
    return <AlertMsg msg={`No Tides found near [${location}].`} />
  }
  if (data.status.code != 200) {
    return <ErrorMsg msg={`Error: ${data.status.code}: ${data.status.msg}`} />
  }

  return <TidesElement data={data} nowDate={nowDate} />
}
