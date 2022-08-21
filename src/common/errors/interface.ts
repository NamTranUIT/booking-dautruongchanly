export interface IErrorMessage {
  message: string;
  code: number;
}
export interface IResponseFailure extends IErrorMessage {
  httpStatusCode: number;
}
