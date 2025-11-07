import { DEFAULT_STATION } from "@/app/_lib/constants"
import { redirect, RedirectType } from "next/navigation"

export async function GET() {
  "use cache"
  redirect(`stations/${DEFAULT_STATION}`, RedirectType.replace)
}
