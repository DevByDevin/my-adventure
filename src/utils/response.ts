import { ErrorResponse, SuccessResponse } from '@/types/response';
import { NextResponse } from 'next/server';

export const createErrorResponse = (message: string, status: number) => {
  const errorResponse: ErrorResponse = {
    success: false,
    message,
    code: status,
  };
  return NextResponse.json(errorResponse, { status });
};

export const createSuccessResponse = (
  message: string,
  data: any,
  status: number
) => {
  const successResponse: SuccessResponse = {
    success: true,
    message,
    data,
    code: status,
  };
  return NextResponse.json(successResponse, { status });
};
