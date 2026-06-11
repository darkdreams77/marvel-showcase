import { apiGet } from "../lib/axios";

import type { ApiResponse } from "@marvel-showcase/shared";
import type { ComicsType } from "@marvel-showcase/shared/src/comics";

export const getComics = (
  page?: number,
  title?: string,
  limit?: number,
): Promise<ApiResponse<ComicsType>> => {
  let filters = `?limit=${limit ? limit : 100}`;
  if (page) filters += `&page=${page}`;
  if (title) filters += `&title=${title}`;

  return apiGet<ComicsType>(`/comics${filters}`);
};
