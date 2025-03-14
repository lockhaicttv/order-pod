import { z } from 'zod'

const exportFileSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  exportType: z.string()
})

export { exportFileSchema }
