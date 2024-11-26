import { internalIpV4 } from 'internal-ip'

import { isProdEnv } from '../src/utils/env'

export async function getAssetPrefix() {
  let internalHost = null

  if (!isProdEnv()) {
    internalHost = await internalIpV4()
  }

  return isProdEnv() ? undefined : `http://${internalHost}:3000`
}

