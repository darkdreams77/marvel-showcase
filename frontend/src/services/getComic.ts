import { apiGet } from "../lib/axios";

import type { ApiResponse } from "@marvel-showcase/shared";
import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";

export const getComic = (
  id: string,
): Promise<ApiResponse<PreviewComicType>> => {
  return apiGet<PreviewComicType>(`/comic/${id}`);
};
