import { tidesFromStation } from "@/app/_lib/tides"
import type { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const tzOffset = request.nextUrl.searchParams.get("tzOffset") || undefined

  const responseData = await tidesFromStation(id, tzOffset)

  return Response.json(responseData)
}
