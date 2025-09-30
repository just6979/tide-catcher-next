import {currentEnv, deploy_envs} from "@/app/lib/env"

export function initStorage() {
  console.log(currentEnv)

  if (currentEnv === deploy_envs.LOCAL) {
    initLocalStorage();
  }
  if( currentEnv === deploy_envs.GCR) {
    initGCRStorage();
  }
  if (currentEnv === deploy_envs.VERCEL) {
    initVercelStorage();
  }
}

function initLocalStorage() {
  console.log("Using LOCAL storage")
}

function initGCRStorage() {
  console.log("Using GCR storage")
}

function initVercelStorage() {
  console.log("Using VERCEL storage")
}
