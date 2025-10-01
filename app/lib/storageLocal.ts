import {access, constants, readFile, writeFile} from "node:fs/promises"

const localStorageDir = `./.storage`

function buildFilename(filename: string) {
  return `${localStorageDir}/${filename}`
}

export async function existsLocal(filename: string) {
  console.log(`${__filename}: checking ${filename}...`)
  try {
    await access(buildFilename(filename), constants.R_OK)
    console.log(`${__filename}: YES: ${filename} exists`)
    return true
  } catch {
    console.error(`${__filename}: NO: ${filename} does not exist`)
    return false
  }
}

export async function readLocal(filename: string): Promise<string> {
  console.log(`${__filename}: Reading ${filename}`)
  try {
    return (await readFile(buildFilename(filename), {encoding: 'utf8'})).toString()
  } catch (err) {
    console.log(`${__filename}: Unable to read ${filename}: ${err}`)
    return ''
  }
}

export async function writeLocal(filename: string, data: string): Promise<void> {
  console.log(`${__filename}: Storing ${filename}`)
  try {
    return await writeFile(buildFilename(filename), data)
  } catch (err) {
    console.log(`${__filename}: Unable to store ${filename}: ${err}`)
  }

}
