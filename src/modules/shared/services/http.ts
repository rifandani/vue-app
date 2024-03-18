import ky from 'ky'
import { env } from '#shared/configs/env'

// Set config defaults when creating the instance
export const http = ky.create({
  prefixUrl: env.apiBaseUrl,
  // validateStatus: status =>
  //   // Resolve only if the status code is less than 500
  //   status < 500,
})
