"use client"

import TidesFromLocationElement from "@/app/_components/TidesFromLocationElement"
import { DEFAULT_LOCATION } from "@/app/_lib/constants"

export default function TidesFromLocation() {
  return <TidesFromLocationElement location={DEFAULT_LOCATION} />
}
