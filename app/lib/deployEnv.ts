export enum envs {
  LOCAL = "LOCAL",
  GCR = "GCR",
  VERCEL = "VERCEL",
}

let currentEnv = envs.LOCAL

export function initDeployEnv() {
  if ("K_SERVICE" in process.env) {
    currentEnv = envs.GCR
  } else if ("VERCEL_ENV" in process.env) {
    currentEnv = envs.VERCEL
  }
  console.log(currentEnv)
  return currentEnv
}

export function getDeployEnv() {
  return currentEnv
}
