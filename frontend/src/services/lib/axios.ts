import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@marvel-showcase/shared";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BFF_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error ?? "Une erreur est survenue";
    return Promise.reject(new Error(message));
  },
);

// GET simple
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const { data } = await api.get<ApiResponse<T>>(url, config);
  return data;
}

export async function apiGetAuth<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const { data } = await api.get<ApiResponse<T>>(url, {
    ...config,
    withCredentials: true,
  });
  return data;
}

// POST
export async function apiPost<TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> {
  const { data } = await api.post<ApiResponse<TResponse>>(url, body, config);
  return data;
}

export async function apiPostAuth<TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> {
  const { data } = await api.post<ApiResponse<TResponse>>(url, body, {
    ...config,
    withCredentials: true,
  });
  return data;
}

// PUT
export async function apiPut<TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> {
  const { data } = await api.put<ApiResponse<TResponse>>(url, body, config);
  return data;
}

export async function apiPutAuth<TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> {
  const { data } = await api.put<ApiResponse<TResponse>>(url, body, {
    ...config,
    withCredentials: true,
  });
  return data;
}

// DELETE
export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const { data } = await api.delete<ApiResponse<T>>(url, config);
  return data;
}

export async function apiDeleteAuth<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const { data } = await api.delete<ApiResponse<T>>(url, {
    ...config,
    withCredentials: true,
  });
  return data;
}
