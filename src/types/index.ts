export interface Response<T> {
  data?: IData<T>;
  error?: IError;
}

export interface IData<T> {
  token?: string;
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface IError {
  data: {
    success: boolean;
    message: string;
  };
  status: number;
}
