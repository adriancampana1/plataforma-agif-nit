export interface ServiceError {
  statusCode: number;
  identifier: string;
  message: string;
  error?: any;
}

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    public identifier: string,
    public message: string,
    public error?: any,
  ) {
    super(message);
  }
}