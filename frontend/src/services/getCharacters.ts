import { apiGet } from "../lib/axios";

import type { ApiResponse } from "@marvel-showcase/shared";
import type { CharactersType } from "@marvel-showcase/shared/src/characters";

export const getCharacters = (
  page?: number,
  name?: string,
  limit?: number,
): Promise<ApiResponse<CharactersType>> => {
  let filters = `?limit=${limit ? limit : 100}`;
  if (page) filters += `&page=${page}`;
  if (name) filters += `&name=${name}`;

  return apiGet<CharactersType>(`/characters${filters}`);
};
