export interface ServiceResponse<t> {
  statusCode: number;
  message: string;
  data?: t;
}