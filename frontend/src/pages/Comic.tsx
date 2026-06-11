import { useNavigate, useParams } from "react-router-dom";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { useState } from "react";
import { constructUrlImg } from "../utils/constructUrlImg";
import { PortraitAspectRatio } from "@marvel-showcase/shared/src/image";
import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";
import { getComic } from "../services/getComic";

export const Comic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comic, setComic] = useState<PreviewComicType>();

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
    <div className="flex h-full">
      <div className="w-1/2 h-[calc(100vh-70px)]">
        <img
          src={constructUrlImg(
            comic?.thumbnail?.path!,
            comic?.thumbnail?.extension!,
            PortraitAspectRatio.UNCANNY,
          )}
          className="object-cover w-full max-h-full min-h-full opacity-20"
        />
      </div>
      <div className="w-1/2 p-20">
        <button onClick={goBack} className="mb-20 btn-marvel-outline">
          Page précédente
        </button>
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
      </div>
    </div>
  );
};
