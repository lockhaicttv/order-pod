export interface BaseDepartment {
  id: string
  code: string
  name: string
}
export interface Department extends BaseDepartment {
  shiftPerDay: number
}

export interface UpdateDepartmentPayload extends Department {}
export type CreateDepartmentPayload = Omit<UpdateDepartmentPayload, 'id'>
export interface DeleteDepartmentsParams {
  id: string[]
}
export interface GetDepartmentParams {
  id: string
}
