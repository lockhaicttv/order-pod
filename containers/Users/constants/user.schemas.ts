import { z } from 'zod'
import { roleSchema } from '@app/containers/Roles/constants/role.schemas' // Assuming you have this already

const baseUserSchema = z.object({
  id: z.string(),
  name: z.string()
})

const userSchema = baseUserSchema.extend({
  roles: z.array(roleSchema), // Use the Role schema here
  status: z.number().int(), // Assuming status is an integer
  password: z.string(),
  userName: z.string(),
  displayName: z.string()
})
const createUserPayloadSchema = userSchema.omit({ id: true })

const deleteUsersParamsSchema = z.object({
  id: z.array(z.string())
})

export { baseUserSchema, userSchema, createUserPayloadSchema, deleteUsersParamsSchema }
