import { tidesFromStation } from "@/app/_lib/tides"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const headersList = request.headers
  const tzOffset = headersList.get("X-Tidecatcher-Tz-Offset") || undefined

  const responseData = await tidesFromStation(id, tzOffset)

  return Response.json(responseData)
}
