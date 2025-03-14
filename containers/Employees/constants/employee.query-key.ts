import { ListingQuery } from '@app/api'

export const employeeQueryKey = {
  getAllEmployees: (query?: ListingQuery) => ['get-all-employees', query],
  getEmployee: (id: string) => ['get-employee', id],
  getEmployeeLeaderByStages: (stageId: string) => ['get-employee-leaders-by-stage', stageId],
  getEmployeeLeaderByGroup: (groupId: string) => ['get-employee-leaders-by-group', groupId]
}
