import { useNavigate, useParams } from "react-router-dom";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { useState } from "react";
import type { CompleteCharacterType } from "@marvel-showcase/shared/src/characters";
import { constructUrlImg } from "../utils/constructUrlImg";
import { PortraitAspectRatio } from "@marvel-showcase/shared/src/image";
import { ComicCover } from "../components/molecules/ComicCover";
import { getComicsFromCharacterId } from "../services/getComicsFromCharacterId";

export const Character = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<CompleteCharacterType>();

  useAsyncEffect(async () => {
    try {
      if (id) {
        const resultCharacter = await getComicsFromCharacterId(id);
        if (resultCharacter.success && resultCharacter.data) {
          console.log("resultCharacter", resultCharacter);
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
          src={constructUrlImg(
            character?.thumbnail?.path!,
            character?.thumbnail?.extension!,
            PortraitAspectRatio.UNCANNY,
          )}
          className="object-cover w-full max-h-full min-h-full opacity-20"
        />
      </div>
      <div className="w-1/2 h-[calc(100vh-70px)] px-20 py-16 flex flex-col">
        <button onClick={goBack} className="mb-20 btn-marvel-outline">
          Page précédente
        </button>
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
                  {character?.comics.map((comic) => (
                    <ComicCover {...comic} />
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
