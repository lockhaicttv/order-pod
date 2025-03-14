import { ListingQuery } from '@app/api'

export const departmentQueryKey = {
  getAllDepartments: (query?: ListingQuery) => ['get-all-departments', query],
  getDepartment: (id: string) => ['get-department', id]
}
