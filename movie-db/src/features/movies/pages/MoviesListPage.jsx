import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesRequested,
  selectMovies,
  selectMoviesError,
  selectMoviesPage,
  selectMoviesQuery,
  selectMoviesStatus,
  selectMoviesTotalPages,
  setMoviesPage,
  setMoviesQuery,
} from "../state/moviesSlice";
import { paths } from "../../../routes/paths";

export default function MoviesListPage() {
  const dispatch = useDispatch();

  const items = useSelector(selectMovies);
  const status = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);
  const page = useSelector(selectMoviesPage);
  const totalPages = useSelector(selectMoviesTotalPages);
  const query = useSelector(selectMoviesQuery);

  const [queryInput, setQueryInput] = useState(query);
  const debouncedQuery = useMemo(() => queryInput.trim(), [queryInput]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setMoviesQuery(debouncedQuery));
    }, 400);
    return () => clearTimeout(id);
  }, [dispatch, debouncedQuery]);

  useEffect(() => {
    dispatch(fetchMoviesRequested());
  }, [dispatch, page, query]);

  return (
    <main className="p-6 max-w-4xl mx-auto">
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

      {status === "loading" && <p className="mt-4">Loading...</p>}
      {status === "failed" && <p className="mt-4 text-red-600">{error}</p>}

      {status === "succeeded" && (
        <ul className="mt-4 space-y-2">
          {items.map((movie) => (
            <li key={movie.id} className="rounded border p-3">
              <Link className="underline" to={paths.movieDetails(movie.id)}>
                {movie.title}
              </Link>
              {movie.release_date ? (
                <span className="ml-2 text-sm text-gray-500">
                  ({movie.release_date})
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          className="rounded border px-3 py-2 disabled:opacity-50"
          onClick={() => dispatch(setMoviesPage(Math.max(1, page - 1)))}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} / {totalPages}
        </span>
        <button
          className="rounded border px-3 py-2 disabled:opacity-50"
          onClick={() =>
            dispatch(setMoviesPage(Math.min(totalPages, page + 1)))
          }
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
