import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import type { ApiResponse, PaginatedResponse } from "@marvel-showcase/shared";

import { config } from "../config/env";

export const api = axios.create({
  baseURL: config.marvelURL,
  headers: { "Content-Type": "application/json" },
});

// Intercepteur : unwrap automatique ou throw sur success: false
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

// GET paginé
export async function apiGetPaginated<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<PaginatedResponse<T>> {
  const { data } = await api.get<PaginatedResponse<T>>(url, config);
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

// PUT
export async function apiPut<TBody, TResponse>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> {
  const { data } = await api.put<ApiResponse<TResponse>>(url, body, config);
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
