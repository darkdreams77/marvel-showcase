import { useState, type ChangeEvent } from "react";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { getCharacters } from "../services/getCharacters";
import { Container } from "../components/Layout/Container";
import { Input } from "../components/atoms/Input";
import type { PreviewCharacterType } from "@marvel-showcase/shared/src/characters";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../components/molecules/Pagination";
import { CharacterCard } from "../components/molecules/CharacterCard";

export const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nextSearchParams = new URLSearchParams(searchParams);

  const [page, setPage] = useState(Number(nextSearchParams.get("page")) || 1);
  const [name, setName] = useState(nextSearchParams.get("name") || "");
  const [characters, setCharacters] = useState<PreviewCharacterType[]>();
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(
    Number(nextSearchParams.get("limit")) || 100,
  );

  const [isLoading, setIsLoading] = useState(true);

  const searchName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setPage(1);
    nextSearchParams.delete("page");

    if (e.target.value === "") {
      nextSearchParams.delete("name");
    } else {
      nextSearchParams.set("name", e.target.value);
    }

    setSearchParams(nextSearchParams);
  };

  useAsyncEffect(async () => {
    try {
      const result = await getCharacters(page, name, limit);
      if (result.success && result.data) {
        setCharacters(result.data.results);
        setCount(result.data.count);
        setIsLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }, [page, name, limit]);

  return (
    <Container className="py-10">
      <div className="w-1/2 mb-10">
        <Input
          type="text"
          id="searchName"
          label="Rechercher un personnage"
          value={name}
          onChange={searchName}
          className="w-full p-4"
        />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        count={count}
      />
      {isLoading ? (
        <div className="grid grid-cols-4 gap-6 my-20">
          <div className="h-full cursor-pointer skeleton-card-portrait marvel-card " />
          <div className="h-full cursor-pointer skeleton-card-portrait marvel-card " />
          <div className="h-full cursor-pointer skeleton-card-portrait marvel-card " />
          <div className="h-full cursor-pointer skeleton-card-portrait marvel-card " />
        </div>
      ) : (
        <ul className="grid grid-cols-4 gap-6 my-20">
          {characters &&
            characters.map((character) => (
              <CharacterCard
                key={character._id}
                {...character}
                isLoading={isLoading}
              />
            ))}
        </ul>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        count={count}
        displayLimit={false}
      />
    </Container>
  );
};
