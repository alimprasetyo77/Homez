export interface Response<T = any> {
  message: string;
  data: T[];
}

export interface ResponsePagination<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
