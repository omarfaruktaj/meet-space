export interface Response<T> {
  data?: IData<T>;
  error?: IError;
}
export interface Pagination {
  page: number;
  totalPage: number;
  limit: number;
  next?: number;
  prev?: number;
  totalRooms: number;
}

export interface IData<T> {
  token?: string;
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination: Pagination;
}

export interface IError {
  data: {
    success: boolean;
    message: string;
  };
  status: number;
}
