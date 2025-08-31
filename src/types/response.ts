export interface BaseResponse {
  success: boolean;
  message: string;
  code: number;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
}

export interface SuccessResponse<T = any> extends BaseResponse {
  success: true;
  data: T;
}

export type AuthApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;
