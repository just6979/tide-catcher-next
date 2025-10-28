import { DEFAULT_LOCATION } from "@/app/_lib/constants"
import { redirect, RedirectType } from "next/navigation"

export async function GET() {
  redirect(`location/${DEFAULT_LOCATION}`, RedirectType.replace)
}
