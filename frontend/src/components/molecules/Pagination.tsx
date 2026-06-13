import type { ChangeEvent, PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  displayLimit?: boolean;
};

const Button = ({
  children,
  onClick,
  disabled,
}: PropsWithChildren<{ onClick: () => void; disabled: boolean }>) => (
  <button
    onClick={onClick}
    className="cursor-pointer btn-marvel-outline"
    disabled={disabled}
  >
    {children}
  </button>
);

export const Pagination = ({
  page,
  setPage,
  limit,
  setLimit,
  count,
  displayLimit = true,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nextSearchParams = new URLSearchParams(searchParams);

  const _lastPage = Math.ceil(count / limit);

  const nextPage = () => {
    setPage((v) => v + 1);
    nextSearchParams.set("page", String(page + 1));
    setSearchParams(nextSearchParams);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const prevPage = () => {
    setPage((v) => v - 1);
    nextSearchParams.set("page", String(page - 1));
    setSearchParams(nextSearchParams);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const firstPage = () => {
    setPage(1);
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const lastPage = () => {
    setPage(_lastPage);
    nextSearchParams.set("page", String(_lastPage));
    setSearchParams(nextSearchParams);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    nextSearchParams.set("limit", e.target.value);
    setSearchParams(nextSearchParams);
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      {displayLimit && (
        <div className="flex items-center justify-between w-full mb-10">
          <div className="w-1/2 text-2xl marvel-title">{count} résultats</div>
          <div className="">
            <label htmlFor="nb-results" className="text-xl marvel-title">
              Nombre de résultats par page :{" "}
            </label>
            <select
              name="limit"
              id="nb-results"
              onChange={changeLimit}
              className="text-xl"
            >
              <option value="20" selected={limit === 20}>
                20
              </option>
              <option value="50" selected={limit === 50}>
                50
              </option>
              <option value="100" selected={limit === 100}>
                100
              </option>
            </select>
          </div>
        </div>
      )}
      <Button onClick={firstPage} disabled={page === 1}>
        <i className="bi bi-chevron-double-left"></i> Page 1
      </Button>

      <Button onClick={prevPage} disabled={page === 1}>
        <i className="bi bi-chevron-left"></i> Page précédente
      </Button>

      <div className="flex flex-col items-center text-xl marvel-title">
        <span>
          Page {page}/{_lastPage}
        </span>
      </div>

      <Button onClick={nextPage} disabled={page === _lastPage}>
        Page suivante <i className="bi bi-chevron-right"></i>
      </Button>

      <Button onClick={lastPage} disabled={page === _lastPage}>
        Page {_lastPage} <i className="bi bi-chevron-double-right"></i>
      </Button>
    </div>
  );
};
