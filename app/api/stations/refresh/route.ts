import { refreshStationsData } from "@/app/_lib/storageSqlite"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GET() {
  refreshStationsData()
  revalidatePath("api/stations/")
  redirect("/api/stations")
}
