import { z } from 'zod'

const loginPayloadSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false).optional()
})

export { loginPayloadSchema }
