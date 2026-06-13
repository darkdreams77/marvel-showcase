import type { FavoriteType } from "@marvel-showcase/shared/src/favorites";

import { apiDeleteAuth } from "./lib/axios";

export const removeFavorite = (externalId: string, type: FavoriteType) =>
  apiDeleteAuth(`/favorites/${type}/${externalId}`);
