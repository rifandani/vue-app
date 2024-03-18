import { z } from 'zod'
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
    const resp = await http.post(
      `auth/login`,
      {
        throwHttpErrors: false, // i'm expecting error response from the backend
        json: creds,
        hooks: {
          afterResponse: [
            async (request, _options, response) => {
              if (response.status === 200) {
                const data = (await response.json()) as LoginApiResponseSchema
                // set 'Authorization' headers
                request.headers.set('Authorization', `Bearer ${data.token}`)
              }
            },
          ],
        },
      },
    ).json<LoginApiResponseSchema>()

    // `parse` will throw if `resp.data` is not correct
    // const loginApiResponse = loginApiResponseSchema.parse(resp.data)

    return resp
  },
} as const
