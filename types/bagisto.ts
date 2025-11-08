export interface BagistoResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export interface CustomerData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  token?: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  channel: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  customer?: CustomerData;
  error?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  customer?: CustomerData;
  error?: any;
}