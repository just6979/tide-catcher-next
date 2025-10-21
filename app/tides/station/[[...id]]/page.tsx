'use client'

import {TidesElement} from '@/app/elements/tidesElement'
import {defaultStation, EMPTY_TIDES_RESPONSE} from '@/app/lib/constants'
import type {TidesResponse} from '@/app/lib/types'
import {useParams} from 'next/navigation'
import {useEffect, useState} from 'react'

export default function TidesFromCoords() {
  const nowDate = new Date()
  const {station} = useParams<{ station: string }>()
  const stationId = station && station.length > 0 ? station[0] : defaultStation

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(EMPTY_TIDES_RESPONSE)

  useEffect(() => {
    fetch(`/api/tides/station/${stationId}`, {
      headers: {
        'X-Tidecatcher-Tz-Offset': (nowDate.getTimezoneOffset() * -1).toString()
      }
    })
      .then((res) => res.json())
      .then((data: TidesResponse) => {
        setData(data)
        setIsLoading(false)
      })
  }, [stationId])

  if (isLoading) {
    return <p>Loading Station with ID {stationId}...</p>
  }
  if (!data || !('tides' in data) || !(data.tides.length > 0)) {
    return <p>No Station with ID {stationId} found.</p>
  }
  if (data.status.code != 200) {
    return <p>Error: {data.status.code}: {data.status.msg}</p>
  }

  return TidesElement(data, nowDate)
}
