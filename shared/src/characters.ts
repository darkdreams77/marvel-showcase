import { PreviewComicType } from "./comics";
import { ImageType } from "./image";

export type CharactersType = {
  count: number;
  limit: number;
  results: PreviewCharacterType[];
};

export type PreviewCharacterType = {
  thumbnail: ImageType;
  comics: string[];
  _id: string;
  name: string;
  description: string;
};

export type CompleteCharacterType = {
  thumbnail: ImageType;
  comics: PreviewComicType[];
  _id: string;
  name: string;
  description: string;
};
