import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";
import { Link } from "react-router-dom";
import { constructUrlImg } from "../../utils/constructUrlImg";
import { StandardAspectRatio } from "@marvel-showcase/shared/src/image";
import { useFavorites } from "../../hooks/useFavorites";
import { FavoriteButton } from "../atoms/FavoriteButton";

export const ComicCard = ({
  thumbnail,
  _id,
  description,
  title,
}: PreviewComicType) => {
  const { isFavorite, toggle } = useFavorites();

  const isFav = isFavorite(_id!);

  const thumbnailUrl = constructUrlImg(
    thumbnail.path,
    thumbnail.extension,
    StandardAspectRatio.XLARGE,
  );

  return (
    <Link to={`/comic/${_id}`}>
      <li className="relative h-full cursor-pointer marvel-card group">
        <FavoriteButton
          toggle={toggle}
          externalId={_id}
          name={title}
          type="comic"
          thumbnailUrl={thumbnailUrl}
          isFavorite={isFav}
        />
        <div className="w-full overflow-hidden h-100">
          <img
            src={constructUrlImg(
              thumbnail.path,
              thumbnail.extension,
              StandardAspectRatio.FANTASTIC,
            )}
            className="object-cover w-full transition-all h-100 hover:scale-120 hover:opacity-75 "
          />
        </div>
        <div className="flex flex-col justify-between h-auto gap-4 p-4">
          <span className="truncate marvel-title">{title}</span>
          {description && (
            <p className="h-6 overflow-hidden truncate marvel-accent-left">
              {description}
            </p>
          )}
        </div>
      </li>
    </Link>
  );
};
