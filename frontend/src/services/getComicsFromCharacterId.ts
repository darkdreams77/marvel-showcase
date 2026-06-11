import { apiGet } from "../lib/axios";

import type { ApiResponse } from "@marvel-showcase/shared";
import type { CompleteCharacterType } from "@marvel-showcase/shared/src/characters";

export const getComicsFromCharacterId = (
  id: string,
): Promise<ApiResponse<CompleteCharacterType>> => {
  return apiGet<CompleteCharacterType>(`/comics/${id}`);
};
