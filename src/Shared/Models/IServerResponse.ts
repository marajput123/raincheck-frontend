export interface IResponseMetadata {
  totalCount: number
}


export interface IServerResponse<T> {
  success: boolean;
  content: T;
  nextLink?: string;
  metadata?: IResponseMetadata;
}

export interface IQuery {
  [key: string]: any
}