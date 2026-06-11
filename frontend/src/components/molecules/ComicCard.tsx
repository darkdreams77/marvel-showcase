import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";
import { Link } from "react-router-dom";
import { constructUrlImg } from "../../utils/constructUrlImg";
import { StandardAspectRatio } from "@marvel-showcase/shared/src/image";

export const ComicCard = ({
  thumbnail,
  _id,
  description,
  title,
}: PreviewComicType) => {
  return (
    <Link to={`/comic/${_id}`}>
      <li className="cursor-pointer marvel-card">
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
          <p className="h-6 overflow-hidden truncate marvel-accent-left">
            {description}
          </p>
        </div>
      </li>
    </Link>
  );
};
