import { useNavigate, useParams } from "react-router-dom";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { useState } from "react";
import { constructUrlImg } from "../utils/constructUrlImg";
import {
  PortraitAspectRatio,
  StandardAspectRatio,
} from "@marvel-showcase/shared/src/image";
import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";
import { getComic } from "../services/getComic";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../context/AuthContext";
import { FavoriteButtonLarge } from "../components/atoms/FavoriteButtonLarge";
import { SplitLayout } from "../components/Layout/SplitLayout";
import { useIsMobile } from "../hooks/useIsMobile";

export const Comic = () => {
  const isMobile = useIsMobile();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggle } = useFavorites();

  const [comic, setComic] = useState<PreviewComicType>();
  const thumbnailDesktop = constructUrlImg(
    comic?.thumbnail?.path!,
    comic?.thumbnail?.extension!,
    PortraitAspectRatio.UNCANNY,
  );

  console.log("isMobile", isMobile);

  const thumbnailMobile = constructUrlImg(
    comic?.thumbnail.path!,
    comic?.thumbnail.extension!,
    StandardAspectRatio.AMAZING,
  );

  const thumbnailFav = constructUrlImg(
    comic?.thumbnail?.path!,
    comic?.thumbnail?.extension!,
    PortraitAspectRatio.XLARGE,
  );

  useAsyncEffect(async () => {
    try {
      if (id) {
        const result = await getComic(id);
        if (result.success && result.data) {
          setComic(result.data);
        }
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }, []);

  const goBack = () => navigate(-1);

  return (
    <SplitLayout backgroundImg={isMobile ? thumbnailMobile : thumbnailDesktop}>
      <div className="flex justify-between">
        <button onClick={goBack} className="mb-20 btn-marvel-outline">
          Page précédente
        </button>
        {user && (
          <FavoriteButtonLarge
            toggle={toggle}
            externalId={id!}
            name={comic?.title!}
            type="comic"
            thumbnailUrl={thumbnailFav}
            isFavorite={isFavorite(id!)}
          />
        )}
      </div>
      <ul className="flex flex-col gap-10 text-2xl">
        <li>
          <span className="marvel-title">Titre :</span> {comic?.title}
        </li>
        {comic?.description && (
          <li>
            <span className="marvel-title">Description :</span>{" "}
            {comic?.description}
          </li>
        )}
      </ul>
    </SplitLayout>
  );
};
