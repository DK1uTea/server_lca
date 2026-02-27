export interface ApiResponse<T = any> {
  data: T | null;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}
