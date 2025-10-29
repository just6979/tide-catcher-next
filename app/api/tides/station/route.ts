import { DEFAULT_STATION } from "@/app/_lib/constants"
import { redirect, RedirectType } from "next/navigation"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.toString()
  redirect(
    `station/${DEFAULT_STATION}${params ? `?${params}` : ""}`,
    RedirectType.replace,
  )
}
