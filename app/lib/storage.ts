import {envs, initDeployEnv} from "@/app/lib/deployEnv";
import {existsLocal, readLocal, writeLocal} from "./storageLocal"

let initialized = false

export function initStorage() {
  if (initialized) {
    return
  }

  const currentEnv = initDeployEnv()
  if (currentEnv === envs.LOCAL) {
    console.log("Using LOCAL storage")
  }
  if (currentEnv === envs.GCR) {
    console.log("Using Google Cloud Storage")
  }
  if (currentEnv === envs.VERCEL) {
    console.log("Using Vercel Blob Storage")
  }

  initialized = true
}

export async function check(filename: string): Promise<boolean> {
  return existsLocal(filename);
}

export async function read(filename: string): Promise<string> {
  return readLocal(filename)
}

export async function write(filename: string, data: string): Promise<void> {
  return writeLocal(filename, data)
}
