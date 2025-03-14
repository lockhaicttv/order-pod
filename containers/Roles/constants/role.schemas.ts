import { z } from 'zod'

// Define the Privileges schema
const privilegesSchema = z.object({
  name: z.string(),
  type: z.number().int() // Assuming `type` is an integer
})

// Define the BaseRole schema
const baseRoleSchema = z.object({
  id: z.string(),
  roleName: z.string(),
  roleCode: z.string(),
  description: z.string() // Assuming description can be optional
})

// Define the Role schema by extending BaseRole and adding privileges
const roleSchema = baseRoleSchema.extend({
  privileges: z.array(privilegesSchema)
})

// Define the CreateRolePayload schema (Omit id from Role)
const createRolePayloadSchema = roleSchema.omit({ id: true })

// Define the DeleteRolesParams schema
const deleteRolesParamsSchema = z.object({
  id: z.array(z.string())
})

// Define the GetRoleParams schema
const getRoleParamsSchema = z.object({
  id: z.string()
})

export {
  privilegesSchema,
  baseRoleSchema,
  roleSchema,
  createRolePayloadSchema,
  deleteRolesParamsSchema,
  getRoleParamsSchema
}
