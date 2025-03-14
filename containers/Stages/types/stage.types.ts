export interface BaseStage {
  id: string
  code: string
  name: string
}

export interface Stage extends BaseStage {
  workingDept: {
    id: string
    code: string
    name: string
    shiftPerDay: number
  }
}
