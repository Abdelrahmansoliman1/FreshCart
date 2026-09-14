export interface IMetadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface IResponse<T> {
  results: number
  metadata: IMetadata
  data: T[]
}
