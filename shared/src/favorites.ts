export type FavoriteType = "character" | "comic";

export interface Favorite {
  _id: string;
  externalId: string;
  type: FavoriteType;
  name: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export interface AddFavoriteBody {
  externalId: string;
  type: FavoriteType;
  name: string;
  thumbnailUrl?: string;
}
