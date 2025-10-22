const basePath = `https://api.tidesandcurrents.noaa.gov`

export function buildNoaaUrl(path: string): string {
  if (path.startsWith(basePath)) {
    console.error(`${path} is already a NOAA URL`)
    return path
  }
  if (path.startsWith("/")) {
    return `${basePath}${path}`
  } else {
    return `${basePath}/${path}`
  }
}

export async function fetchNoaaUrl(path: string) {
  try {
    const noaaResponse = await fetch(buildNoaaUrl(path), {
      cache: "force-cache",
    })
    return await noaaResponse.json()
  } catch (error) {
    return {
      errorMsg: error instanceof Error ? error.toString() : "Unknown error",
      errorCode: 500,
    }
  }
}
