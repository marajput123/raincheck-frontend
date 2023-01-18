export interface IServerResponse<T> {
    success: boolean;
    content: T,
    nextLink?: string
  }