import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";

import { constructUrlImg } from "../../utils/constructUrlImg";
import { PortraitAspectRatio } from "@marvel-showcase/shared/src/image";
import { Link } from "react-router-dom";

export const ComicCover = ({
  _id,
  thumbnail,
  description,
  title,
}: PreviewComicType) => {
  return (
    <Link to={`/comic/${_id}`}>
      <div className="flex items-center gap-6 mb-4 hover:bg-void-500">
        <img
          src={constructUrlImg(
            thumbnail.path!,
            thumbnail.extension!,
            PortraitAspectRatio.MEDIUM,
          )}
          className="p-2 border aspect-auto border-marvel-500 max-w-20"
        />
        <div className="pr-4">
          <div className="mb-3 text-md marvel-title">{title}</div>
          <p className="text-sm marvel-accent-left line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
