import { z } from 'zod'
import type { ErrorApiResponseSchema } from '#shared/schemas/error'
import { http } from '#shared/services/http'

export const loginSchema = z.object({
  username: z.string().min(3, 'username must contain at least 3 characters'),
  password: z.string().min(6, 'password must contain at least 6 characters'),
  expiresInMins: z.number().optional(),
})

export const loginApiResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.union([z.literal('male'), z.literal('female')]),
  image: z.string().url(),
  token: z.string(),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type LoginApiResponseSchema = z.infer<typeof loginApiResponseSchema>

export const authApi = {
  login: async (creds: LoginSchema) => {
    const resp = await http.post<LoginApiResponseSchema | ErrorApiResponseSchema>(
      `auth/login`,
      creds,
    )

    // `parse` will throw if `resp.data` is not correct
    const loginApiResponse = loginApiResponseSchema.parse(resp.data)
    // set 'Authorization' headers to
    http.defaults.headers.common.Authorization = `Bearer ${loginApiResponse.token}`

    return loginApiResponse
  },
} as const
