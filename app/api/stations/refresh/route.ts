import { createStationsDb } from "@/app/_lib/storageSqlite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET() {
  createStationsDb()
  revalidatePath("api/stations/")
  redirect("/api/stations")
}
