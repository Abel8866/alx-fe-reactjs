import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesRequested,
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
  selectMoviesTotalPages,
  setMoviesPage,
  setMoviesQuery,
} from "../state/moviesSlice";
import { paths } from "../../../routes/paths";
import useDebounce from "../../../shared/hooks/useDebounce";
import Loading from "../../../shared/components/Feedback/Loading";
import ErrorState from "../../../shared/components/Feedback/ErrorState";
import EmptyState from "../../../shared/components/Feedback/EmptyState";
import MoviesGrid from "../components/MoviesGrid";

function toPositiveInt(value, fallback = 1) {
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function MoviesListPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the source of truth (like movies-browser)
  const urlQuery = searchParams.get("search") ?? "";
  const urlPage = toPositiveInt(searchParams.get("page") ?? "1", 1);

  const items = useSelector(selectMovies);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);
  const totalPages = useSelector(selectMoviesTotalPages);

  // input mirrors URL (so refresh/back/forward keeps UI consistent)
  const [queryInput, setQueryInput] = useState(urlQuery);

  useEffect(() => {
    setQueryInput(urlQuery);
  }, [urlQuery]);

  const debouncedQueryInput = useDebounce(queryInput, 400);
  const normalizedDebouncedQuery = useMemo(
    () => (debouncedQueryInput || "").trim(),
    [debouncedQueryInput],
  );

  // When user types: update URL (and reset page to 1)
  useEffect(() => {
    if (normalizedDebouncedQuery === urlQuery) return;

    const next = {};
    if (normalizedDebouncedQuery) next.search = normalizedDebouncedQuery;
    next.page = "1";
    setSearchParams(next, { replace: true });
  }, [normalizedDebouncedQuery, setSearchParams, urlQuery]);

  // When URL changes: update Redux + fetch
  useEffect(() => {
    dispatch(setMoviesQuery(urlQuery));
    dispatch(setMoviesPage(urlPage));
    dispatch(fetchMoviesRequested());
  }, [dispatch, urlPage, urlQuery]);

  const goToPage = (nextPage) => {
    const safeNext = Math.min(Math.max(1, nextPage), totalPages || 1);

    const next = {};
    if (urlQuery) next.search = urlQuery;
    next.page = String(safeNext);
    setSearchParams(next);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Movies</h1>
        <Link className="text-sm underline" to={paths.people}>
          People
        </Link>
      </div>

      <input
        className="mt-4 w-full rounded border px-3 py-2"
        placeholder="Search movies..."
        value={queryInput}
        onChange={(e) => setQueryInput(e.target.value)}
      />

      {status === "loading" && (
        <div className="mt-6">
          <Loading />
        </div>
      )}
      {status === "failed" && (
        <div className="mt-6">
          <ErrorState title="Something went wrong" message={error} />
        </div>
      )}

      {status === "succeeded" && items.length === 0 && (
        <div className="mt-6">
          <EmptyState title="No results" message="Try a different search." />
        </div>
      )}

      {status === "succeeded" && items.length > 0 && (
        <MoviesGrid items={items} />
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          className="rounded border px-3 py-2 disabled:opacity-50"
          onClick={() => goToPage(urlPage - 1)}
          disabled={urlPage <= 1}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {urlPage} / {totalPages}
        </span>
        <button
          className="rounded border px-3 py-2 disabled:opacity-50"
          onClick={() => goToPage(urlPage + 1)}
          disabled={urlPage >= totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
