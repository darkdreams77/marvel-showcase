import { useState } from "react";
import { cn } from "../../helpers/cn";
import type {
  AddFavoriteBody,
  FavoriteType,
} from "@marvel-showcase/shared/src/favorites";

type FavoriteButtonProps = {
  toggle: (item: AddFavoriteBody) => Promise<void>;
  externalId: string;
  name: string;
  type: FavoriteType;
  thumbnailUrl: string;
  isFavorite: boolean;
};

export const FavoriteButton = ({
  toggle,
  externalId,
  name,
  type,
  thumbnailUrl,
  isFavorite,
}: FavoriteButtonProps) => {
  const [pulse, setPulse] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setPulse(true);

    toggle({
      externalId,
      name,
      type,
      thumbnailUrl,
    });
  };

  return (
    <button
      onClick={toggleFavorite}
      className={cn(
        "absolute z-10 flex items-center justify-center rounded-full cursor-pointer size-10 top-2 right-2 bg-void-700",
        pulse ? "animate-ping" : "",
      )}
      onMouseOut={() => setPulse(false)}
    >
      {isFavorite ? (
        <i className="text-lg bi bi-heart-fill text-marvel-500" />
      ) : (
        <i className="text-lg bi bi-heart-fill" />
      )}
    </button>
  );
};
