export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: IError;
}

export interface IError {
  data: {
    success: boolean;
    message: string;
  };
  status: number;
}
