import { ListingQuery } from '@app/api'

export const employeeGroupQueryKey = {
  getAllEmployeeGroups: (query?: ListingQuery) => ['get-all-employee-groups', query],
  getEmployeeGroup: (id: string) => ['get-employee-group', id]
}
