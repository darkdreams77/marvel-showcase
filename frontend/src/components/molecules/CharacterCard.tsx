import { Link } from "react-router-dom";

import type { PreviewCharacterType } from "@marvel-showcase/shared/src/characters";
import { StandardAspectRatio } from "@marvel-showcase/shared/src/image";

import { constructUrlImg } from "../../utils/constructUrlImg";
import LoadingImg from "../../assets/loading.jpg";

type CharacterCardProps = {
  isLoading: boolean;
} & PreviewCharacterType;

export const CharacterCard = ({
  thumbnail,
  _id,
  comics,
  description,
  name,
  isLoading,
}: CharacterCardProps) => {
  return (
    <Link to={`/personnage/${_id}`} className="h-full">
      <li className="h-full cursor-pointer marvel-card group">
        <div className="w-full overflow-hidden h-100">
          <img
            src={
              isLoading
                ? LoadingImg
                : constructUrlImg(
                    thumbnail.path,
                    thumbnail.extension,
                    StandardAspectRatio.XLARGE,
                  )
            }
            className="object-cover w-full transition-all h-100 group-hover:scale-120 hover:opacity-75 "
          />
        </div>
        <div className="flex flex-col justify-between h-auto gap-4 p-4">
          <span className="truncate marvel-title">{name}</span>
          <div className="marvel-badge">
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
