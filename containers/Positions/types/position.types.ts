interface BasePosition {
  id: string
  name: string
}

export interface Position extends BasePosition {}

export interface UpdatePositionPayload extends Omit<Position, 'dept'> {}

export type CreatePositionPayload = Omit<UpdatePositionPayload, 'id'>
export interface DeletePositionsParams {
  id: string[]
}
