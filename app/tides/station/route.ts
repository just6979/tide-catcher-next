import { DEFAULT_STATION } from "@/app/_lib/constants"
import { redirect, RedirectType } from "next/navigation"

export const dynamic = "force-static"

export async function GET() {
  redirect(`station/${DEFAULT_STATION}`, RedirectType.replace)
}
