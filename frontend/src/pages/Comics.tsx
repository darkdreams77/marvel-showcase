import { useState, type ChangeEvent } from "react";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { Container } from "../components/Layout/Container";
import { Input } from "../components/atoms/Input";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../components/molecules/Pagination";
import { getComics } from "../services/getComics";
import type { PreviewComicType } from "@marvel-showcase/shared/src/comics";
import { ComicCard } from "../components/molecules/ComicCard";

export const Comics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nextSearchParams = new URLSearchParams(searchParams);

  const [page, setPage] = useState(Number(nextSearchParams.get("page")) || 1);
  const [title, setTitle] = useState(nextSearchParams.get("title") || "");
  const [comics, setComics] = useState<PreviewComicType[]>();
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(
    Number(nextSearchParams.get("limit")) || 100,
  );

  const [isLoading, setIsLoading] = useState(true);

  const searchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setPage(1);
    nextSearchParams.delete("page");

    if (e.target.value === "") {
      nextSearchParams.delete("title");
    } else {
      nextSearchParams.set("title", e.target.value);
    }

    setSearchParams(nextSearchParams);
  };

  useAsyncEffect(async () => {
    try {
      const result = await getComics(page, title, limit);
      if (result.success && result.data) {
        setComics(result.data.results);
        setCount(result.data.count);
        setIsLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }, [page, title, limit]);

  return (
    <Container className="py-10">
      <div className="w-1/2 mb-10">
        <Input
          type="text"
          id="searchName"
          label="Rechercher un comic"
          value={title}
          onChange={searchTitle}
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
        <>en cours de chargement...</>
      ) : (
        <ul className="grid grid-cols-4 gap-6 my-20">
          {comics &&
            comics.map((comic) => <ComicCard {...comic} key={comic._id} />)}
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
