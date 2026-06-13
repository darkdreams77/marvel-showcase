import type {
  AddFavoriteBody,
  Favorite,
} from "@marvel-showcase/shared/src/favorites";

import { apiPostAuth } from "./lib/axios";

export const addFavorite = (body: AddFavoriteBody) =>
  apiPostAuth<AddFavoriteBody, Favorite>("/favorites", body);
