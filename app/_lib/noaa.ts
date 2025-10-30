import { NOAA_API_BASE_PATH } from "@/app/_lib/constants"

export function buildNoaaUrl(path: string): string {
  if (path.startsWith(NOAA_API_BASE_PATH)) {
    console.log(`${path} is already a NOAA URL`)
    return path
  }
  if (path.startsWith("/")) {
    return `${NOAA_API_BASE_PATH}${path}`
  } else {
    return `${NOAA_API_BASE_PATH}/${path}`
  }
}

export async function fetchNoaaUrl(path: string) {
  try {
    const noaaResponse = await fetch(buildNoaaUrl(path))
    return await noaaResponse.json()
  } catch (error) {
    return {
      errorMsg: error instanceof Error ? error.toString() : "Unknown error",
      errorCode: 500,
    }
  }
}
