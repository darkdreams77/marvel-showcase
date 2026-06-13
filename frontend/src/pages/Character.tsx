import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  PortraitAspectRatio,
  StandardAspectRatio,
} from "@marvel-showcase/shared/src/image";
import type { CompleteCharacterType } from "@marvel-showcase/shared/src/characters";

import useAsyncEffect from "../hooks/useAsyncEffect";
import { constructUrlImg } from "../utils/constructUrlImg";
import { ComicCover } from "../components/molecules/ComicCover";
import { getComicsFromCharacterId } from "../services/getComicsFromCharacterId";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../context/AuthContext";

export const Character = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggle } = useFavorites();

  const [character, setCharacter] = useState<CompleteCharacterType>();
  const thumbnail = constructUrlImg(
    character?.thumbnail?.path!,
    character?.thumbnail?.extension!,
    PortraitAspectRatio.UNCANNY,
  );

  const thumbnailFav = constructUrlImg(
    character?.thumbnail?.path!,
    character?.thumbnail?.extension!,
    StandardAspectRatio.XLARGE,
  );

  useAsyncEffect(async () => {
    try {
      if (id) {
        const resultCharacter = await getComicsFromCharacterId(id);
        if (resultCharacter.success && resultCharacter.data) {
          setCharacter(resultCharacter.data);
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
          src={thumbnail}
          className="object-cover w-full max-h-full min-h-full opacity-20"
        />
      </div>
      <div className="w-1/2 h-[calc(100vh-70px)] px-20 py-16 flex flex-col">
        <div className="flex justify-between">
          <button onClick={goBack} className="mb-20 btn-marvel-outline">
            Page précédente
          </button>
          {user && (
            <button
              onClick={() =>
                toggle({
                  externalId: character?._id!,
                  name: character?.name!,
                  type: "character",
                  thumbnailUrl: thumbnailFav,
                })
              }
              className="mb-20 btn-marvel-outline"
            >
              {isFavorite(id!) ? (
                <>
                  Retirer des favoris{" "}
                  <i className="bi bi-heartbreak text-marvel-500" />
                </>
              ) : (
                <>
                  Ajouter aux favoris <i className="bi bi-heart-fill" />
                </>
              )}
            </button>
          )}
        </div>
        <ul className="flex flex-col gap-10 text-2xl">
          <li>
            <span className="marvel-title">Nom :</span> {character?.name}
          </li>
          {character?.description && (
            <li className="text-xl">
              <span className="text-xl marvel-title">Description :</span>{" "}
              {character?.description}
            </li>
          )}
          {character?.comics && character?.comics.length > 0 && (
            <>
              <hr className="marvel-divider" />
              <li>
                <div className="mb-6 marvel-title">
                  Comics où ce personnage apparait :
                </div>
                <div className="overflow-auto h-180">
                  {character?.comics.map((comic, index) => (
                    <React.Fragment key={`${comic}-${index}`}>
                      <ComicCover {...comic} />
                    </React.Fragment>
                  ))}
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
