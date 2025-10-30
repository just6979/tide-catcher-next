import TidesChooserClient from "@/app/_components/TidesChooser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "| Chooser",
}

export default function TideChoose() {
  return <TidesChooserClient />
}
