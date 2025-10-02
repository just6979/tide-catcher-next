import {redirect} from 'next/navigation'
import {stationsAll} from "@/app/lib/stationsAll"
import {revalidatePath} from "next/cache"

export async function GET() {
  await stationsAll(true)
  revalidatePath('api/stations/')
  redirect('/api/stations')
}
