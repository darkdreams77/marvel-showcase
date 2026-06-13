import { useState, useEffect } from "react";

import type {
  AddFavoriteBody,
  Favorite,
  FavoriteType,
} from "@marvel-showcase/shared/src/favorites";

import { getFavorites } from "../services/getFavorites";
import { removeFavorite } from "../services/deleteFavorite";
import { addFavorite } from "../services/postFavorite";

export function useFavorites(type?: FavoriteType) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    getFavorites(type).then((res) => {
      if (res.success && res.data) setFavorites(res.data);
    });
  }, [type]);

  function isFavorite(externalId: string) {
    return favorites.some((f) => f.externalId === externalId);
  }

  async function toggle(item: AddFavoriteBody) {
    if (isFavorite(item.externalId)) {
      await removeFavorite(item.externalId, item.type);
      setFavorites((prev) =>
        prev.filter((f) => f.externalId !== item.externalId),
      );
    } else {
      const res = await addFavorite(item);
      if (res.success && res.data) setFavorites((prev) => [...prev, res.data!]);
    }
  }

  return { favorites, isFavorite, toggle };
}
