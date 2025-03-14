import { Stage } from '@app/containers/Stages/types/stage.types'

export interface BaseMachine {
  id: string
  code: string
}

export interface Machine extends BaseMachine {
  stage: Stage
}
