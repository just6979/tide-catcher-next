'use client'

import TidesFromLocationElement from '@/app/components/TidesFromLocationElement'
import {defaultLocation} from '@/app/lib/constants'
import {useParams} from 'next/navigation'

export default function TidesFromLocation() {
  const {loc} = useParams<{ loc: string }>()
  const location = loc && loc.length > 0 ? decodeURIComponent(loc[0]) : defaultLocation
  return <TidesFromLocationElement location={location}/>
}
