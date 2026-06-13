import type {
  AddFavoriteBody,
  FavoriteType,
} from "@marvel-showcase/shared/src/favorites";
import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { cn } from "../../helpers/cn";
import { PiHeartBreakFill } from "react-icons/pi";

type FavoriteButtonLargeProps = {
  toggle: (item: AddFavoriteBody) => Promise<void>;
  externalId: string;
  name: string;
  type: FavoriteType;
  thumbnailUrl: string;
  isFavorite: boolean;
};

export const FavoriteButtonLarge = ({
  toggle,
  externalId,
  name,
  type,
  thumbnailUrl,
  isFavorite,
}: FavoriteButtonLargeProps) => {
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
      className="btn-marvel-outline"
      onMouseOut={() => setPulse(false)}
    >
      {isFavorite ? (
        <>
          Retirer des favoris{" "}
          <PiHeartBreakFill className={cn(pulse ? "animate-ping" : "")} />
        </>
      ) : (
        <>
          Ajouter aux favoris{" "}
          <GoHeartFill
            className={cn("text-marvel-500", pulse ? "animate-ping" : "")}
          />
        </>
      )}
    </button>
  );
};
