export const PLAN_LIST_ROUTE = '/plans'
export const PLAN_DETAIL_CREATE_ROUTE = (planId?: string) => `/plan-detail/${planId}/create`
export const PLAN_DETAIL_EDIT_ROUTE = (planId?: string, id?: string) => `/plan-detail/${planId}/${id}`
