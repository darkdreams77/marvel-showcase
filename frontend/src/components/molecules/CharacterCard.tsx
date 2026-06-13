import { Link } from "react-router-dom";

import type { PreviewCharacterType } from "@marvel-showcase/shared/src/characters";
import { StandardAspectRatio } from "@marvel-showcase/shared/src/image";

import { constructUrlImg } from "../../utils/constructUrlImg";
import { useFavorites } from "../../hooks/useFavorites";
import { cn } from "../../helpers/cn";
import { useState } from "react";
import { FavoriteButton } from "../atoms/FavoriteButton";

export const CharacterCard = ({
  thumbnail,
  _id,
  comics,
  description,
  name,
}: PreviewCharacterType) => {
  const { isFavorite, toggle } = useFavorites();

  const isFav = isFavorite(_id!);

  const thumbnailUrl = constructUrlImg(
    thumbnail.path,
    thumbnail.extension,
    StandardAspectRatio.XLARGE,
  );

  return (
    <Link to={`/personnage/${_id}`} className="h-full">
      <li className="relative h-full cursor-pointer marvel-card group">
        <FavoriteButton
          toggle={toggle}
          externalId={_id}
          name={name}
          type="character"
          thumbnailUrl={thumbnailUrl}
          isFavorite={isFav}
        />
        <div className="w-full overflow-hidden h-100">
          <img
            src={thumbnailUrl}
            className="object-cover w-full transition-all h-100 group-hover:scale-120 hover:opacity-75 "
          />
        </div>
        <div className="justify-between h-auto p-4">
          <div className="truncate marvel-title">{name}</div>
          <div className="my-2 marvel-eyebrow">
            {comics.length} comic
            {comics.length > 1 ? "s" : ""}
          </div>
          {description && (
            <p className="line-clamp-3 marvel-accent-left">{description}</p>
          )}
        </div>
      </li>
    </Link>
  );
};
