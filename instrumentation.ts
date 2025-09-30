import {setDeployEnv} from "@/app/lib/env"
import {initStorage} from "@/app/lib/storage";

export function register() {
  setDeployEnv()
  initStorage()
}
