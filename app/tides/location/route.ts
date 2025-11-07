import { DEFAULT_LOCATION } from "@/app/_lib/constants"
import { redirect, RedirectType } from "next/navigation"

export async function GET() {
  'use cache'
  redirect(`location/${DEFAULT_LOCATION}`, RedirectType.replace)
}
