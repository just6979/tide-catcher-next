export enum deploy_envs {
  LOCAL = 'LOCAL',
  GCR = 'GCR',
  VERCEL = 'VERCEL'
}

export let currentEnv = deploy_envs.LOCAL

export function setDeployEnv() {
  if ('K_SERVICE' in process.env) {
    currentEnv = deploy_envs.GCR
  } else if ('VERCEL_ENV' in process.env) {
    currentEnv=  deploy_envs.VERCEL
  }
}
