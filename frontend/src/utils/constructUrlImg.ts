import type {
  PortraitAspectRatio,
  StandardAspectRatio,
} from "@marvel-showcase/shared/src/image";

export const constructUrlImg = (
  path: string,
  extension: string,
  type: PortraitAspectRatio | StandardAspectRatio,
) => `${path}/${type}.${extension}`;
