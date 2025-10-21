'use client'

import {TidesElement} from '@/app/elements/tidesElement'
import {defaultLocation, EMPTY_TIDES_RESPONSE} from '@/app/lib/constants'
import type {TidesResponse} from '@/app/lib/types'
import {useParams} from 'next/navigation'
import {useEffect, useMemo, useState} from 'react'

export default function TidesFromStation() {
  const {loc} = useParams<{ loc: string }>()
  const location = loc && loc.length > 0 ? decodeURIComponent(loc[0]) : defaultLocation

  const nowDate = useMemo(() => new Date(), [])

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(EMPTY_TIDES_RESPONSE)

  useEffect(() => {
    fetch(`/api/tides/location/${location}`, {
      headers: {
        'X-Tidecatcher-Tz-Offset': (nowDate.getTimezoneOffset() * -1).toString()
      }
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
  if (!data || !('tides' in data) || !(data.tides.length > 0)) {
    return <p>No Tides found near [{location}].</p>
  }
  if (data.status.code != 200) {
    return <p>Error: {data.status.code}: {data.status.msg}</p>
  }

  return TidesElement(data, nowDate)
}
