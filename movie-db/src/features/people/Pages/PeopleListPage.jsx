import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPeopleRequested,
  selectPeople,
  selectPeopleError,
  selectPeopleStatus,
  selectPeopleTotalPages,
  setPeoplePage,
  setPeopleQuery,
} from "../state/peopleSlice";
import { paths } from "../../../routes/paths";
import Loading from "../../../shared/components/Feedback/Loading";
import ErrorState from "../../../shared/components/Feedback/ErrorState";
import EmptyState from "../../../shared/components/Feedback/EmptyState";

function toPositiveInt(value, fallback = 1) {
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function PeopleListPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the source of truth (same pattern as MoviesListPage)
  const urlQuery = searchParams.get("search") ?? "";
  const urlPage = toPositiveInt(searchParams.get("page") ?? "1", 1);

  const items = useSelector(selectPeople);
  const status = useSelector(selectPeopleStatus);
  const error = useSelector(selectPeopleError);
  const totalPages = useSelector(selectPeopleTotalPages);

  // When URL changes: update Redux + fetch
  useEffect(() => {
    dispatch(setPeopleQuery(urlQuery));
    dispatch(setPeoplePage(urlPage));
    dispatch(fetchPeopleRequested());
  }, [dispatch, urlPage, urlQuery]);

  const goToPage = (nextPage) => {
    const safeNext = Math.min(Math.max(1, nextPage), totalPages || 1);

    const next = {};
    if (urlQuery) next.search = urlQuery;
    next.page = String(safeNext);
    setSearchParams(next);
  };

  return (
    <main>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">People</h1>
        <Link className="text-sm underline" to={paths.movies}>
          Movies
        </Link>
      </div>

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
        <ul className="mt-6 space-y-2">
          {items.map((person) => (
            <li key={person.id} className="rounded border p-3 bg-white">
              <Link className="underline" to={paths.personDetails(person.id)}>
                {person.name}
              </Link>
              {person.known_for_department ? (
                <span className="ml-2 text-sm text-gray-500">
                  ({person.known_for_department})
                </span>
              ) : null}
            </li>
          ))}
        </ul>
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
