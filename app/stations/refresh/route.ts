import { createStationsDb } from "@/app/_lib/storageSqlite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET() {
  createStationsDb()
  revalidatePath("/stations")
  redirect(`/stations?refreshed`) // Navigate to the new post page
}
