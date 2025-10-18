const basePath = `https://api.tidesandcurrents.noaa.gov`

export function buildNoaaUrl(path: string): string {
  if (path.startsWith(basePath)) {
    console.error(`${path} is already a NOAA URL`)
    return path
  }
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  } else {
    return `${basePath}/${path}`
  }
}

export async function fetchNoaaUrl(path: string): Promise<any> {
  try {
    const noaaResponse = await fetch(buildNoaaUrl(path), {cache: 'force-cache'})
    return await noaaResponse.json()
  } catch (error) {
    let msg = (error instanceof Error) ? error.toString() : 'Unknown error'
    return {error: {message: msg}}
  }
}

export function checkNoaaError(response: any): string {
  if ('error' in response) {
    return 'message' in response.error ? response.error.message : 'Unknown error'
  }
  if ('errorCode' in response) {
    return `$stationsData['errorCode']: ${response.errorMsg}`
  }
  return ''
}
