interface Stage {
  id: string
  stageOrder: number
  name: string
  inputProductId: string
  outputProductId: string
  workingTime: number
  numberOfMachine: number
  machinePower: number
  availableDate: Date
  status: boolean
}

export interface Machine {
  id: string
  name: string
  stage: Stage
}
