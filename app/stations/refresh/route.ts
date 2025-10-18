import {stationsAll} from '@/app/lib/stationsAll'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

export async function GET() {
  await stationsAll(true)
  revalidatePath('/stations')
  redirect(`/stations?refreshed`) // Navigate to the new post page
}
