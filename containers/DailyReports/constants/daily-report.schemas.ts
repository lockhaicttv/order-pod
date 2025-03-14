import { z } from 'zod'

// Assuming the following schemas are defined elsewhere and imported accordingly
import { baseEmployeeSchema, employeeSchema } from '@app/containers/Employees/constants/employee.schemas'
import { productSchema } from '@app/containers/Products/constants/product.schemas'
import { baseStageSchema } from '@app/containers/Stages/constants/stage.schemas'
import { baseMachineSchema } from '@app/containers/Machines/constants/machine.schemas'
import { employeeGroupSchema } from '@app/containers/EmployeeGroups/constants/employee-group.schemas'

const productInfoSchema = z.object({
  id: z.string().nullish().optional(),
  code: z.string({
    required_error: 'Required'
  }),
  info: productSchema,
  weight: z.number(),
  quantity: z.number()
})

const materialInputSchema = z.object({
  id: z.string().nullish().optional(),
  material: productInfoSchema
    .omit({
      weight: true,
      quantity: true
    })
    .extend({
      weight: z.number().default(0),
      quantity: z.number().default(0)
    }),
  weight: z.number(),
  returnWeight: z.number(),
  returnQuantity: z.number(),
  notes: z.array(z.string()).nullable()
})

const producingInfoSchema = z.object({
  input: z.array(materialInputSchema),
  output: productInfoSchema,
  machine: baseMachineSchema.nullable().optional().default(null)
})

const issueSchema = z.object({
  id: z.string().nullish(),
  code: z.string(),
  name: z.string(),
  issueStage: baseStageSchema
})

const issueProductSchema = z.object({
  product: productInfoSchema,
  issue: issueSchema,
  weight: z.number(),
  quantity: z.number(),
  notes: z.array(z.string()).nullable()
})

const returnMaterialSchema = z.object({
  product: productInfoSchema,
  weight: z.number(),
  quantity: z.number(),
  notes: z.array(z.string()).nullable()
})

const dailyReportSchema = z.object({
  date: z.string(),
  reportEmployee: employeeSchema
    .omit({
      group: true
    })
    .extend({
      group: z.lazy(() =>
        employeeGroupSchema
          .omit({
            employees: true
          })
          .extend({
            employees: z.array(z.lazy(() => baseEmployeeSchema)).nullish()
          })
      )
    }),
  workingEmployee: employeeSchema
    .omit({
      group: true
    })
    .extend({
      group: z.lazy(() =>
        employeeGroupSchema
          .omit({
            employees: true
          })
          .extend({
            employees: z.array(z.lazy(() => baseEmployeeSchema)).nullish()
          })
      )
    }),
  tickets: z.array(z.string()),
  producingInfos: z.array(producingInfoSchema),
  issueProducts: z.array(issueProductSchema).nullable()
  // returnMaterials: z.array(returnMaterialSchema).nullable()
})

export {
  dailyReportSchema,
  returnMaterialSchema,
  issueProductSchema,
  producingInfoSchema,
  productInfoSchema,
  materialInputSchema
}
