import TidesFromGPS from '@/app/_components/TidesFromGPS'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: "@ GPS",
}

export default function TidesByGPS() {
  return <TidesFromGPS/>
}
