export type Meta = {
  limit: number
  count: number
  total: number
  page: number
}

export type DataEntry<T, List extends boolean = false> = {
  data: T
  statusText: string
  code: number
} & (List extends true ? { meta: Meta } : {})

export type ListingQuery = {
  page?: number
  size?: number
  sort?: string[]
}
