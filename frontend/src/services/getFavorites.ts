import type {
  Favorite,
  FavoriteType,
} from "@marvel-showcase/shared/src/favorites";

import { apiGetAuth } from "./lib/axios";

export const getFavorites = (type?: FavoriteType) =>
  apiGetAuth<Favorite[]>(`/favorites${type ? `?type=${type}` : ""}`);
