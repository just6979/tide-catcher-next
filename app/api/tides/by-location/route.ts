import {NextResponse} from "next/server"
import responseData from '../../data/tc_plum_island_example.json'

export async function GET() {

  return NextResponse.json(responseData)
}
