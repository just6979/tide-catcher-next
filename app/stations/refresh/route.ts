import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {stationsAll} from "@/app/lib/stationsAll"

export async function GET() {
  await stationsAll(true)
  revalidatePath('/stations')
  redirect(`/stations?refreshed`) // Navigate to the new post page
}
