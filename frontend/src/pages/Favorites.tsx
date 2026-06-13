import { useState, type ChangeEvent } from "react";

import { Container } from "../components/Layout/Container";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { getFavorites } from "../services/getFavorites";
import type {
  Favorite,
  FavoriteType,
} from "@marvel-showcase/shared/src/favorites";
import { FavoriteCard } from "../components/molecules/FavoriteCard";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>();
  const [categoryFilters, setcategoryFilters] = useState(new Set());

  useAsyncEffect(async () => {
    try {
      const result = await getFavorites();
      if (result.success && result.data) {
        setFavorites(result.data);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }, []);

  const updateFilters = (checked: boolean, categoryFilter: FavoriteType) => {
    if (checked)
      setcategoryFilters((prev) => new Set(prev).add(categoryFilter));
    if (!checked)
      setcategoryFilters((prev) => {
        const next = new Set(prev);
        next.delete(categoryFilter);
        return next;
      });
  };

  const filteredItems =
    categoryFilters.size === 0
      ? favorites
      : favorites?.filter((p) => categoryFilters.has(p.type));

  return (
    <Container className="px-6 py-10 xl:px-0">
      <h2 className="mb-6 text-3xl marvel-title">Mes favoris</h2>
      <p className="flex gap-6 mb-4 marvel-title">
        Filtrer par :{" "}
        <div className="flex items-center gap-4">
          <label
            htmlFor="characters"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              id="characters"
              name="characters"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateFilters(e.target.checked, "character")
              }
              className="appearance-none checked:bg-marvel-500 size-4 rounded-sm p-1 bg-marvel-50/10"
            />{" "}
            Personnages
          </label>{" "}
          <label
            htmlFor="comics"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              id="comics"
              name="comics"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateFilters(e.target.checked, "comic")
              }
              className="appearance-none checked:bg-marvel-500 size-4 rounded-sm p-1 bg-marvel-50/10"
            />{" "}
            Comics
          </label>
        </div>
      </p>
      <hr className="marvel-divider mb-6" />
      {filteredItems && filteredItems.length > 0 ? (
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredItems.map((fav) => (
            <FavoriteCard key={fav._id} {...fav} />
          ))}
        </ul>
      ) : (
        <p>Tu n'as aucun favori</p>
      )}
    </Container>
  );
};
