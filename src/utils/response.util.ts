import { Response } from 'express';

interface ResponseData<T> {
  data: T | null;
  message: string;
  status?: string;
}

/**
 * Standardizes API response format
 * @param res Express Response object
 * @param statusCode HTTP status code
 * @param payload Object containing data, message, and/or status
 */
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  { data, message, status }: ResponseData<T>
) => {
  return res.status(statusCode).json({
    data: data !== undefined ? data : null,
    message: message || '',
    status: status || (statusCode >= 200 && statusCode < 300 ? 'success' : 'error'),
    timestamp: new Date().toISOString(),
  });
};
