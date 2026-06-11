import { apiGet } from "../lib/axios";

import type { ApiResponse } from "@marvel-showcase/shared";
import type { PreviewCharacterType } from "@marvel-showcase/shared/src/characters";

export const getCharacter = (
  id: string,
): Promise<ApiResponse<PreviewCharacterType>> => {
  return apiGet<PreviewCharacterType>(`/character/${id}`);
};
