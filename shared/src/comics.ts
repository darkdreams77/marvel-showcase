import { ImageType } from "./image";

export type ComicsType = {
  count: number;
  limit: number;
  results: PreviewComicType[];
};

export type PreviewComicType = {
  thumbnail: ImageType;
  _id: string;
  title: string;
  description: string;
};
