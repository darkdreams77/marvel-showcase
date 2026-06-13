import type { Favorite } from "@marvel-showcase/shared/src/favorites";
import { Link } from "react-router-dom";

export const FavoriteCard = ({
  externalId,
  name,
  type,
  thumbnailUrl,
}: Favorite) => {
  const typeUrl = type === "character" ? "personnage" : "comic";

  return (
    <Link to={`/${typeUrl}/${externalId}`}>
      <li className="w-full h-full p-2 marvel-card">
        {type === "character" ? (
          <span className="marvel-badge">personnage</span>
        ) : (
          <span className="marvel-badge">comic</span>
        )}
        <img src={thumbnailUrl} className="my-2" />
        <div className="marvel-eyebrow">{name}</div>
      </li>
    </Link>
  );
};
